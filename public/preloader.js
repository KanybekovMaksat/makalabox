(function () {
  const style = document.createElement("style");

  style.innerHTML = `
    #preloader {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      background: #009dff0e;
      color: #111827;
    }

    #preloader .logo {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    #preloader .text {
      font-size: 16px;
      opacity: 0.7;
      margin-bottom: 16px;
    }

    #preloader .dots span {
      animation: blink 1.4s infinite both;
      font-size: 20px;
    }

    #preloader .dots span:nth-child(2) {
      animation-delay: 0.2s;
    }

    #preloader .dots span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes blink {
      0% { opacity: 0; }
      20% { opacity: 1; }
      100% { opacity: 0; }
    }
  `;

  document.head.appendChild(style);
})();
