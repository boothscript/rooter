module.exports = content => {
  return `
        <html>
            <head>
  
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.0/css/bulma.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" integrity="sha256-+N4/V/SbAFiW1MPBCXnfnP9QSN3+Keu+NlB+0ev/YKQ=" crossorigin="anonymous" />
            <link rel="stylesheet" href="/css/main.css" />
            </head>
            <body>
  
                <header>
                    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
                        <div class="navbar-brand ">
                            <a class="navbar-item" href="/">
                                <b>ROOTER</b>
                            </a>
                        </div>
                    </nav>
                </header>
                <main class="section has-background-light">
                    ${content}
                </main>
                <script src="/js/app.js"></script>
            </body>
        </html>
    `;
};
