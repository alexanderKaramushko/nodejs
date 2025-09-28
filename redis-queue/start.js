#!/usr/bin/env node

import { spawn } from "child_process";
import { waterfall } from "async";

let isAllStarted = false;

waterfall(
  [
    function startRedis(callback) {
      console.log("Запускаем Redis...");

      const redisProcess = spawn(
        "yarn",
        ["workspace", "queue", "run", "start:redis"],
        {
          stdio: ["inherit", "pipe"],
        }
      );

      redisProcess.stdout.on("data", (data) => {
        if (data.includes("Ready to accept connections tcp")) {
          console.log("Запущен Redis...");
          callback();
        }
      });
    },
    function startQueue(callback) {
      console.log("Запускаем сервер очереди...");

      const queueServer = spawn(
        "yarn",
        ["workspace", "queue", "run", "start"],
        {
          stdio: ["inherit", "pipe"],
        }
      );

      queueServer.stdout.on("data", (data) => {
        if (data.toString().includes("3000") && !isAllStarted) {
          console.log("Запущен сервер очереди");
          callback();
        } else if (isAllStarted) {
          console.log("Сервер очереди:", data.toString());
        }
      });
    },
    function startSocketLogs(callback) {
      const socketLogsServer = spawn(
        "yarn",
        ["workspace", "socket-logs", "run", "start"],
        {
          stdio: ["inherit", "pipe"],
        }
      );

      socketLogsServer.stdout.on("data", (data) => {
        console.log("Запускаем сокет чтения логов...");

        if (
          data.toString().includes("Подсоединились к приложению очереди") &&
          !isAllStarted
        ) {
          console.log("Запущен сокет чтения логов");
          callback();
        } else if (isAllStarted) {
          console.log("Сокет чтения логов:", data.toString());
        }
      });
    },
    function startServer(callback) {
      console.log("Запускаем веб-сервер...");

      const server = spawn("yarn", ["workspace", "server", "run", "start"], {
        stdio: ["inherit", "pipe"],
      });

      server.stdout.on("data", (data) => {
        if (data.toString().includes("8124") && !isAllStarted) {
          console.log("Запущен веб-сервер");
          callback();
        } else if (isAllStarted) {
          console.log("Веб-сервер:", data.toString());
        }
      });
    },
  ],
  (error) => {
    if (error) {
      console.log("Не удалось запустить сервисы:", error.message);
    } else {
      console.log("Все сервисы запущены");
      isAllStarted = true;
    }
  }
);
