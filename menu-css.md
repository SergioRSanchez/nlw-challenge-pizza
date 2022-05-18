Para quem não conseguir visualizar o código CSS do menu e button active é só usar o código abaixo:


nav#navigation .menu li a.active::after,
  nav#navigation .menu li a:hover::after {
    padding-inline: 0.8rem;
    width: 100%;
  }

  nav#navigation.scroll .menu li a.active,
  nav#navigation.scroll .menu li a:hover {
    opacity: 1;
  }

  nav#navigation.scroll .menu a.button.active,
  nav#navigation.scroll .menu a.button:hover {
    background-color: var(--primary-color);
    filter: brightness(1.3);
    border: none;
  }

  nav#navigation .social-links {
    display: none;
  }