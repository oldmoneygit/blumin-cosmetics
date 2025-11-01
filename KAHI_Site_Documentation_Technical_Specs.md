# DOCUMENTAÇÃO TÉCNICA COMPLETA - SITE KAHI COSMETICS
## Para Implementação no Site BLUMIN (Linha KAHI)

---

## 1. OVERVIEW GERAL DO SITE

### 1.1 Conceito e Identidade Visual
- **Estilo**: Minimalista, clean, luxury skincare aesthetic
- **Approach**: Premium Korean beauty (K-beauty) com foco em inovação científica
- **Filosofia**: "Discover Your Beautiful Change" - transformação através de produtos eficazes
- **Tom**: Sofisticado, científico, acessível

### 1.2 Paleta de Cores Principal

```css
/* CORES PRIMÁRIAS */
--primary-pink: #FFB8D1;           /* Rosa suave principal */
--primary-white: #FFFFFF;          /* Branco puro */
--primary-cream: #FFF8F5;          /* Creme/Off-white para backgrounds */

/* CORES SECUNDÁRIAS */
--secondary-pink: #FFC9D9;         /* Rosa mais claro para hover states */
--accent-coral: #FFD4DC;           /* Coral suave para detalhes */
--soft-beige: #F5F0ED;             /* Bege claro para seções alternadas */

/* CORES DE TEXTO */
--text-primary: #2C2C2C;           /* Preto suave para texto principal */
--text-secondary: #666666;         /* Cinza médio para texto secundário */
--text-light: #999999;             /* Cinza claro para labels e informações menores */

/* CORES DE FUNDO */
--bg-primary: #FFFFFF;             /* Background principal */
--bg-secondary: #FFF8F5;           /* Background alternado */
--bg-section: #F9F9F9;             /* Background de seções específicas */

/* CORES DE INTERAÇÃO */
--border-color: #E8E8E8;           /* Bordas suaves */
--hover-bg: #FFE8EF;               /* Background hover rosa muito claro */
--focus-color: #FFB8D1;            /* Cor de foco */
```

### 1.3 Tipografia

```css
/* FAMÍLIA DE FONTES */
--font-primary: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-secondary: 'Lato', 'Helvetica Neue', Arial, sans-serif;
--font-accent: 'Playfair Display', Georgia, serif; /* Para títulos especiais */

/* TAMANHOS DE FONTE - Desktop */
--font-size-hero: 72px;            /* Título principal hero */
--font-size-h1: 48px;              /* H1 */
--font-size-h2: 36px;              /* H2 */
--font-size-h3: 28px;              /* H3 */
--font-size-h4: 24px;              /* H4 */
--font-size-body-large: 18px;      /* Texto corpo grande */
--font-size-body: 16px;            /* Texto corpo padrão */
--font-size-small: 14px;           /* Texto pequeno */
--font-size-tiny: 12px;            /* Labels e informações mínimas */

/* TAMANHOS DE FONTE - Mobile */
--font-size-hero-mobile: 36px;
--font-size-h1-mobile: 32px;
--font-size-h2-mobile: 26px;
--font-size-h3-mobile: 22px;
--font-size-h4-mobile: 20px;
--font-size-body-mobile: 15px;

/* PESO DAS FONTES */
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* LINE HEIGHT */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.8;
--line-height-loose: 2;

/* LETTER SPACING */
--letter-spacing-tight: -0.02em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.05em;
--letter-spacing-wider: 0.1em;
```

---

## 2. HEADER / NAVIGATION

### 2.1 Estrutura do Header

```html
<header class="site-header">
  <div class="announcement-bar">
    <p>FREE SHIPPING ON ORDERS OVER $50 | SHOP NOW</p>
  </div>
  
  <nav class="main-navigation">
    <div class="nav-container">
      <!-- Logo -->
      <div class="logo-wrapper">
        <a href="/">
          <img src="/logo.png" alt="KAHI Cosmetics" class="site-logo">
        </a>
      </div>
      
      <!-- Menu Principal -->
      <ul class="nav-menu">
        <li><a href="/shop">SHOP</a></li>
        <li><a href="/best-sellers">BEST SELLERS</a></li>
        <li><a href="/about">ABOUT</a></li>
        <li><a href="/ingredients">INGREDIENTS</a></li>
        <li><a href="/reviews">REVIEWS</a></li>
      </ul>
      
      <!-- Icons Right -->
      <div class="nav-icons">
        <a href="/search" class="icon-search">
          <svg><!-- Search Icon --></svg>
        </a>
        <a href="/account" class="icon-account">
          <svg><!-- Account Icon --></svg>
        </a>
        <a href="/cart" class="icon-cart">
          <svg><!-- Cart Icon --></svg>
          <span class="cart-count">0</span>
        </a>
      </div>
      
      <!-- Mobile Menu Toggle -->
      <button class="mobile-menu-toggle">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</header>
```

### 2.2 Estilos do Header

```css
/* ANNOUNCEMENT BAR */
.announcement-bar {
  background: linear-gradient(90deg, #FFB8D1 0%, #FFC9D9 100%);
  color: #FFFFFF;
  text-align: center;
  padding: 12px 20px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.announcement-bar p {
  margin: 0;
  animation: slideIn 0.5s ease-out;
}

/* MAIN NAVIGATION */
.main-navigation {
  background: #FFFFFF;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

/* LOGO */
.logo-wrapper {
  flex: 0 0 auto;
}

.site-logo {
  height: 45px;
  width: auto;
  transition: transform 0.3s ease;
}

.site-logo:hover {
  transform: scale(1.05);
}

/* MENU */
.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 40px;
  flex: 1;
  justify-content: center;
}

.nav-menu li a {
  color: #2C2C2C;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 8px 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-menu li a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #FFB8D1;
  transition: width 0.3s ease;
}

.nav-menu li a:hover {
  color: #FFB8D1;
}

.nav-menu li a:hover::after {
  width: 100%;
}

/* NAV ICONS */
.nav-icons {
  display: flex;
  gap: 25px;
  align-items: center;
}

.nav-icons a {
  color: #2C2C2C;
  position: relative;
  transition: color 0.3s ease;
}

.nav-icons a:hover {
  color: #FFB8D1;
}

.nav-icons svg {
  width: 22px;
  height: 22px;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #FFB8D1;
  color: #FFFFFF;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}

/* MOBILE MENU */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.mobile-menu-toggle span {
  width: 25px;
  height: 2px;
  background: #2C2C2C;
  transition: all 0.3s ease;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 20px;
    height: 60px;
  }
  
  .nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #FFFFFF;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .nav-menu.active {
    display: flex;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .site-logo {
    height: 35px;
  }
}
```

---

## 3. HERO SECTION / VIDEO BANNER

### 3.1 Estrutura do Hero

```html
<section class="hero-section">
  <div class="hero-video-container">
    <video 
      autoplay 
      muted 
      loop 
      playsinline
      class="hero-video"
      poster="/hero-video-poster.jpg"
    >
      <source src="/hero-video.mp4" type="video/mp4">
    </video>
    
    <!-- Overlay -->
    <div class="hero-overlay"></div>
    
    <!-- Hero Content -->
    <div class="hero-content">
      <div class="hero-content-wrapper">
        <h1 class="hero-title">
          <span class="hero-subtitle">Discover Your</span>
          <span class="hero-main-title">Beautiful Change</span>
        </h1>
        
        <div class="hero-features">
          <div class="feature-badge">
            <span class="feature-text">EASY & EFFECTIVE</span>
          </div>
          <div class="feature-badge">
            <span class="feature-text">KIND TO SKIN & EYES</span>
          </div>
          <div class="feature-badge">
            <span class="feature-text">ECO-CONSCIOUS</span>
          </div>
        </div>
        
        <a href="#shop" class="hero-cta">
          SHOP NOW
        </a>
      </div>
    </div>
  </div>
  
  <!-- Scroll Indicator -->
  <div class="scroll-indicator">
    <span>Scroll</span>
    <svg class="scroll-arrow"><!-- Arrow SVG --></svg>
  </div>
</section>
```

### 3.2 Estilos do Hero

```css
/* HERO SECTION */
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
}

.hero-video-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* HERO OVERLAY */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 184, 209, 0.2) 0%,
    rgba(255, 255, 255, 0.4) 100%
  );
  z-index: 1;
}

/* HERO CONTENT */
.hero-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  padding: 40px;
}

.hero-content-wrapper {
  text-align: center;
  max-width: 900px;
}

/* HERO TITLE */
.hero-title {
  margin: 0 0 40px;
  animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
  display: block;
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #2C2C2C;
  margin-bottom: 10px;
  opacity: 0.9;
}

.hero-main-title {
  display: block;
  font-size: 72px;
  font-weight: 700;
  color: #2C2C2C;
  line-height: 1.1;
  letter-spacing: -1px;
  text-shadow: 0 2px 20px rgba(255, 255, 255, 0.8);
}

/* HERO FEATURES */
.hero-features {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.feature-badge {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 12px 24px;
  border-radius: 30px;
  border: 1px solid rgba(255, 184, 209, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.feature-text {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.5px;
  color: #2C2C2C;
  text-transform: uppercase;
}

/* HERO CTA */
.hero-cta {
  display: inline-block;
  background: #FFB8D1;
  color: #FFFFFF;
  padding: 18px 50px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(255, 184, 209, 0.4);
  animation: fadeInUp 1s ease-out 0.4s both;
}

.hero-cta:hover {
  background: #FFA3C4;
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(255, 184, 209, 0.6);
}

/* SCROLL INDICATOR */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #2C2C2C;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  z-index: 3;
  animation: bounce 2s infinite;
}

.scroll-arrow {
  width: 20px;
  height: 20px;
}

/* ANIMATIONS */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .hero-section {
    height: 80vh;
    min-height: 500px;
  }
  
  .hero-subtitle {
    font-size: 16px;
    letter-spacing: 2px;
  }
  
  .hero-main-title {
    font-size: 36px;
  }
  
  .hero-features {
    gap: 10px;
  }
  
  .feature-badge {
    padding: 8px 16px;
  }
  
  .feature-text {
    font-size: 11px;
  }
  
  .hero-cta {
    padding: 14px 35px;
    font-size: 14px;
  }
}
```

---

## 4. BEST SELLERS SECTION

### 4.1 Estrutura Best Sellers

```html
<section class="best-sellers-section">
  <div class="container">
    <!-- Section Header -->
    <div class="section-header">
      <span class="section-tag">TOP PICKS</span>
      <h2 class="section-title">BEST SELLERS</h2>
      <p class="section-description">
        Our most-loved products, backed by thousands of glowing reviews
      </p>
    </div>
    
    <!-- Products Grid -->
    <div class="products-grid">
      <!-- Product Card 1 -->
      <div class="product-card">
        <!-- Product Image -->
        <div class="product-image-wrapper">
          <img 
            src="/product-1.jpg" 
            alt="Multi Balm Stick"
            class="product-image"
          >
          <div class="product-badges">
            <span class="badge badge-bestseller">BEST SELLER</span>
            <span class="badge badge-new">NEW</span>
          </div>
          <button class="quick-view-btn">QUICK VIEW</button>
        </div>
        
        <!-- Product Info -->
        <div class="product-info">
          <h3 class="product-name">Wrinkle Bounce Multi Balm</h3>
          <div class="product-rating">
            <div class="stars">★★★★★</div>
            <span class="rating-count">(1,234)</span>
          </div>
          <p class="product-description">
            Multi-purpose stick for instant hydration and glow
          </p>
          <div class="product-price">
            <span class="price-current">$32.00</span>
            <span class="price-original">$40.00</span>
          </div>
          <button class="add-to-cart-btn">ADD TO CART</button>
        </div>
      </div>
      
      <!-- Repeat for more products -->
    </div>
    
    <!-- View All Button -->
    <div class="section-footer">
      <a href="/shop" class="view-all-btn">VIEW ALL PRODUCTS</a>
    </div>
  </div>
</section>
```

### 4.2 Estilos Best Sellers

```css
/* BEST SELLERS SECTION */
.best-sellers-section {
  padding: 100px 0;
  background: #FFFFFF;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

/* SECTION HEADER */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-tag {
  display: inline-block;
  color: #FFB8D1;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 15px;
}

.section-title {
  font-size: 48px;
  font-weight: 700;
  color: #2C2C2C;
  margin: 0 0 20px;
  letter-spacing: -1px;
}

.section-description {
  font-size: 18px;
  color: #666666;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* PRODUCTS GRID */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
}

/* PRODUCT CARD */
.product-card {
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  border-color: #FFB8D1;
}

/* PRODUCT IMAGE */
.product-image-wrapper {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #FFF8F5;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.08);
}

/* PRODUCT BADGES */
.product-badges {
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 2;
}

.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.badge-bestseller {
  background: #FFB8D1;
  color: #FFFFFF;
}

.badge-new {
  background: #2C2C2C;
  color: #FFFFFF;
}

/* QUICK VIEW BUTTON */
.quick-view-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: #FFFFFF;
  color: #2C2C2C;
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  z-index: 3;
}

.product-card:hover .quick-view-btn {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.quick-view-btn:hover {
  background: #FFB8D1;
  color: #FFFFFF;
}

/* PRODUCT INFO */
.product-info {
  padding: 25px;
}

.product-name {
  font-size: 20px;
  font-weight: 600;
  color: #2C2C2C;
  margin: 0 0 12px;
  line-height: 1.3;
}

/* PRODUCT RATING */
.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.stars {
  color: #FFB8D1;
  font-size: 16px;
  letter-spacing: 2px;
}

.rating-count {
  color: #999999;
  font-size: 14px;
}

/* PRODUCT DESCRIPTION */
.product-description {
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
  margin: 0 0 15px;
}

/* PRODUCT PRICE */
.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.price-current {
  font-size: 24px;
  font-weight: 700;
  color: #2C2C2C;
}

.price-original {
  font-size: 18px;
  color: #999999;
  text-decoration: line-through;
}

/* ADD TO CART BUTTON */
.add-to-cart-btn {
  width: 100%;
  background: #FFB8D1;
  color: #FFFFFF;
  padding: 14px 20px;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  background: #FFA3C4;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 184, 209, 0.4);
}

/* SECTION FOOTER */
.section-footer {
  text-align: center;
}

.view-all-btn {
  display: inline-block;
  background: transparent;
  color: #2C2C2C;
  padding: 16px 50px;
  border: 2px solid #2C2C2C;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  background: #2C2C2C;
  color: #FFFFFF;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .best-sellers-section {
    padding: 60px 0;
  }
  
  .container {
    padding: 0 20px;
  }
  
  .section-title {
    font-size: 32px;
  }
  
  .section-description {
    font-size: 16px;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 25px;
  }
}
```

---

## 5. BALMSTICKS SIGNATURE SECTION

### 5.1 Estrutura Balmsticks

```html
<section class="balmsticks-section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">SIGNATURE PRODUCTS</span>
      <h2 class="section-title">OUR SIGNATURE BALMSTICKS</h2>
    </div>
    
    <div class="balmsticks-grid">
      <!-- Balmstick Item -->
      <div class="balmstick-item">
        <div class="balmstick-image-wrapper">
          <img src="/balmstick-1.jpg" alt="Wrinkle Bounce Multi Balm">
          <div class="hover-overlay">
            <a href="/product/wrinkle-bounce" class="shop-btn">SHOP NOW</a>
          </div>
        </div>
        <div class="balmstick-info">
          <h3 class="balmstick-name">Wrinkle Bounce Multi Balm</h3>
          <p class="balmstick-desc">Multi-purpose stick for instant glow</p>
          <span class="balmstick-price">$32.00</span>
        </div>
      </div>
      
      <!-- Repeat for other balmsticks -->
    </div>
  </div>
</section>
```

### 5.2 Estilos Balmsticks

```css
/* BALMSTICKS SECTION */
.balmsticks-section {
  padding: 80px 0;
  background: #FFF8F5;
}

.balmsticks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.balmstick-item {
  text-align: center;
  transition: transform 0.3s ease;
}

.balmstick-item:hover {
  transform: translateY(-5px);
}

.balmstick-image-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  aspect-ratio: 3 / 4;
}

.balmstick-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.balmstick-item:hover .balmstick-image-wrapper img {
  transform: scale(1.1);
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 184, 209, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.balmstick-item:hover .hover-overlay {
  opacity: 1;
}

.shop-btn {
  background: #FFFFFF;
  color: #2C2C2C;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;
}

.shop-btn:hover {
  background: #2C2C2C;
  color: #FFFFFF;
}

.balmstick-name {
  font-size: 18px;
  font-weight: 600;
  color: #2C2C2C;
  margin: 0 0 8px;
}

.balmstick-desc {
  font-size: 14px;
  color: #666666;
  margin: 0 0 10px;
}

.balmstick-price {
  font-size: 20px;
  font-weight: 700;
  color: #FFB8D1;
}
```

---

## 6. INGREDIENTS SECTION (ALL ABOUT KAHI)

### 6.1 Estrutura Ingredients

```html
<section class="ingredients-section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">SCIENCE MEETS BEAUTY</span>
      <h2 class="section-title">ALL ABOUT: KAHI</h2>
      <p class="section-description">
        Discover the powerful ingredients behind our innovative formulas
      </p>
    </div>
    
    <div class="ingredients-list">
      <!-- Ingredient Card 1: Salmon DNA -->
      <div class="ingredient-card">
        <div class="ingredient-content">
          <div class="ingredient-text">
            <h3 class="ingredient-name">Salmon DNA</h3>
            <p class="ingredient-description">
              Sodium DNA (PDRN) supports skin repair, hydration, and elasticity. 
              It helps boost collagen, smooth fine lines, and promote natural 
              skin regeneration.
            </p>
            <div class="ingredient-benefits">
              <span class="benefit-tag">ANTI-AGING</span>
              <span class="benefit-tag">HYDRATION</span>
              <span class="benefit-tag">REPAIR</span>
            </div>
          </div>
          <div class="ingredient-image">
            <img 
              src="/ingredient-salmon-dna.jpg" 
              alt="Salmon DNA Molecular Structure"
            >
          </div>
        </div>
      </div>
      
      <!-- Ingredient Card 2: 144HR Jeju Oil -->
      <div class="ingredient-card reverse">
        <div class="ingredient-content">
          <div class="ingredient-image">
            <img 
              src="/ingredient-jeju-oil.jpg" 
              alt="144HR Jeju Oil"
            >
          </div>
          <div class="ingredient-text">
            <h3 class="ingredient-name">144HR Jeju Oil</h3>
            <p class="ingredient-description">
              Jeju Island's pure ingredients undergo 144-hour fermentation, 
              enhancing absorption, deep hydration, and long-lasting moisture 
              retention.
            </p>
            <div class="ingredient-benefits">
              <span class="benefit-tag">DEEP HYDRATION</span>
              <span class="benefit-tag">NATURAL</span>
              <span class="benefit-tag">FERMENTED</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Ingredient Card 3: FILMEXEL -->
      <div class="ingredient-card">
        <div class="ingredient-content">
          <div class="ingredient-text">
            <h3 class="ingredient-name">FILMEXEL™</h3>
            <p class="ingredient-description">
              Filmexel™ technology creates a natural bio-film with Doty algae 
              and Tara Spinosa, helping smooth fine lines and refine skin texture. 
              Patented in FR & US.
            </p>
            <div class="ingredient-benefits">
              <span class="benefit-tag">PATENTED</span>
              <span class="benefit-tag">SMOOTHING</span>
              <span class="benefit-tag">BIO-FILM</span>
            </div>
          </div>
          <div class="ingredient-image">
            <img 
              src="/ingredient-filmexel.jpg" 
              alt="FILMEXEL Technology"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 6.2 Estilos Ingredients

```css
/* INGREDIENTS SECTION */
.ingredients-section {
  padding: 100px 0;
  background: #FFFFFF;
}

.ingredients-list {
  display: flex;
  flex-direction: column;
  gap: 80px;
}

/* INGREDIENT CARD */
.ingredient-card {
  border-radius: 20px;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
}

.ingredient-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
}

.ingredient-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  align-items: center;
}

.ingredient-card.reverse .ingredient-content {
  grid-template-columns: 1fr 1fr;
}

/* INGREDIENT TEXT */
.ingredient-text {
  padding: 60px;
}

.ingredient-name {
  font-size: 36px;
  font-weight: 700;
  color: #2C2C2C;
  margin: 0 0 20px;
  letter-spacing: -0.5px;
}

.ingredient-description {
  font-size: 16px;
  color: #666666;
  line-height: 1.8;
  margin: 0 0 30px;
}

/* INGREDIENT BENEFITS */
.ingredient-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.benefit-tag {
  display: inline-block;
  background: linear-gradient(135deg, #FFB8D1 0%, #FFC9D9 100%);
  color: #FFFFFF;
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

/* INGREDIENT IMAGE */
.ingredient-image {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.ingredient-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.ingredient-card:hover .ingredient-image img {
  transform: scale(1.05);
}

/* RESPONSIVE */
@media (max-width: 968px) {
  .ingredient-content {
    grid-template-columns: 1fr !important;
  }
  
  .ingredient-text {
    padding: 40px 30px;
  }
  
  .ingredient-name {
    font-size: 28px;
  }
  
  .ingredient-image {
    min-height: 300px;
  }
}
```

---

## 7. FAQ SECTION

### 7.1 Estrutura FAQ

```html
<section class="faq-section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">HAVE QUESTIONS?</span>
      <h2 class="section-title">Frequently Asked Questions</h2>
    </div>
    
    <div class="faq-grid">
      <!-- FAQ Item 1 -->
      <div class="faq-item">
        <button class="faq-question">
          <span>Is This an Official KAHI Store?</span>
          <svg class="faq-icon"><!-- Plus/Minus Icon --></svg>
        </button>
        <div class="faq-answer">
          <p>
            Yes, we are the official Kahi store, and we also operate 
            the Kahi Amazon US store.
          </p>
        </div>
      </div>
      
      <!-- FAQ Item 2 -->
      <div class="faq-item">
        <button class="faq-question">
          <span>Do You Ship Faster Than Amazon?</span>
          <svg class="faq-icon"><!-- Plus/Minus Icon --></svg>
        </button>
        <div class="faq-answer">
          <p>
            Our products are in stock and ready to ship! You can expect 
            shipping times similar to Amazon.
          </p>
        </div>
      </div>
      
      <!-- More FAQ Items -->
    </div>
  </div>
</section>
```

### 7.2 Estilos FAQ

```css
/* FAQ SECTION */
.faq-section {
  padding: 100px 0;
  background: #FFF8F5;
}

.faq-grid {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* FAQ ITEM */
.faq-item {
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.faq-question {
  width: 100%;
  background: none;
  border: none;
  padding: 25px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-align: left;
  font-size: 18px;
  font-weight: 600;
  color: #2C2C2C;
  transition: all 0.3s ease;
}

.faq-question:hover {
  color: #FFB8D1;
}

.faq-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
  color: #FFB8D1;
}

.faq-item.active .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-item.active .faq-answer {
  max-height: 300px;
}

.faq-answer p {
  padding: 0 30px 25px;
  margin: 0;
  font-size: 16px;
  color: #666666;
  line-height: 1.7;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .faq-question {
    padding: 20px;
    font-size: 16px;
  }
  
  .faq-answer p {
    padding: 0 20px 20px;
    font-size: 14px;
  }
}
```

---

## 8. FOOTER

### 8.1 Estrutura do Footer

```html
<footer class="site-footer">
  <!-- Footer Main -->
  <div class="footer-main">
    <div class="container">
      <div class="footer-grid">
        <!-- Column 1: Brand -->
        <div class="footer-column">
          <div class="footer-logo">
            <img src="/logo-white.png" alt="KAHI Cosmetics">
          </div>
          <p class="footer-description">
            Discover your beautiful change with innovative Korean skincare 
            solutions that deliver real results.
          </p>
          <div class="footer-social">
            <a href="#" class="social-link instagram">
              <svg><!-- Instagram Icon --></svg>
            </a>
            <a href="#" class="social-link facebook">
              <svg><!-- Facebook Icon --></svg>
            </a>
            <a href="#" class="social-link youtube">
              <svg><!-- YouTube Icon --></svg>
            </a>
            <a href="#" class="social-link tiktok">
              <svg><!-- TikTok Icon --></svg>
            </a>
          </div>
        </div>
        
        <!-- Column 2: Shop -->
        <div class="footer-column">
          <h4 class="footer-heading">SHOP</h4>
          <ul class="footer-links">
            <li><a href="/shop/all">All Products</a></li>
            <li><a href="/shop/best-sellers">Best Sellers</a></li>
            <li><a href="/shop/multi-balms">Multi Balms</a></li>
            <li><a href="/shop/sunscreen">Sunscreen</a></li>
            <li><a href="/shop/sets">Gift Sets</a></li>
          </ul>
        </div>
        
        <!-- Column 3: About -->
        <div class="footer-column">
          <h4 class="footer-heading">ABOUT</h4>
          <ul class="footer-links">
            <li><a href="/about">Our Story</a></li>
            <li><a href="/ingredients">Ingredients</a></li>
            <li><a href="/sustainability">Sustainability</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        
        <!-- Column 4: Support -->
        <div class="footer-column">
          <h4 class="footer-heading">SUPPORT</h4>
          <ul class="footer-links">
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/returns">Returns & Exchanges</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/track-order">Track Order</a></li>
          </ul>
        </div>
        
        <!-- Column 5: Newsletter -->
        <div class="footer-column">
          <h4 class="footer-heading">STAY CONNECTED</h4>
          <p class="newsletter-text">
            Subscribe for exclusive offers and skincare tips
          </p>
          <form class="newsletter-form">
            <input 
              type="email" 
              placeholder="Your email address"
              class="newsletter-input"
              required
            >
            <button type="submit" class="newsletter-btn">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Footer Bottom -->
  <div class="footer-bottom">
    <div class="container">
      <div class="footer-bottom-content">
        <p class="copyright">
          © 2025 KAHI Cosmetics. All rights reserved.
        </p>
        <ul class="footer-legal">
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/cookies">Cookie Policy</a></li>
        </ul>
        <div class="payment-methods">
          <img src="/payment-visa.svg" alt="Visa">
          <img src="/payment-mastercard.svg" alt="Mastercard">
          <img src="/payment-amex.svg" alt="American Express">
          <img src="/payment-paypal.svg" alt="PayPal">
        </div>
      </div>
    </div>
  </div>
</footer>
```

### 8.2 Estilos do Footer

```css
/* SITE FOOTER */
.site-footer {
  background: #2C2C2C;
  color: #FFFFFF;
}

/* FOOTER MAIN */
.footer-main {
  padding: 80px 0 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  gap: 50px;
}

/* FOOTER COLUMN */
.footer-column {
  display: flex;
  flex-direction: column;
}

/* FOOTER LOGO */
.footer-logo {
  margin-bottom: 20px;
}

.footer-logo img {
  height: 40px;
  width: auto;
}

/* FOOTER DESCRIPTION */
.footer-description {
  font-size: 14px;
  color: #CCCCCC;
  line-height: 1.7;
  margin-bottom: 25px;
}

/* FOOTER SOCIAL */
.footer-social {
  display: flex;
  gap: 15px;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #FFB8D1;
  transform: translateY(-3px);
}

.social-link svg {
  width: 20px;
  height: 20px;
}

/* FOOTER HEADING */
.footer-heading {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0 0 20px;
  color: #FFFFFF;
}

/* FOOTER LINKS */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: #CCCCCC;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
  display: inline-block;
}

.footer-links a:hover {
  color: #FFB8D1;
  transform: translateX(3px);
}

/* NEWSLETTER */
.newsletter-text {
  font-size: 14px;
  color: #CCCCCC;
  line-height: 1.6;
  margin-bottom: 20px;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.newsletter-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 14px 18px;
  color: #FFFFFF;
  font-size: 14px;
  transition: all 0.3s ease;
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.newsletter-input:focus {
  outline: none;
  border-color: #FFB8D1;
  background: rgba(255, 255, 255, 0.15);
}

.newsletter-btn {
  background: #FFB8D1;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 14px 20px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-btn:hover {
  background: #FFA3C4;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 184, 209, 0.4);
}

/* FOOTER BOTTOM */
.footer-bottom {
  background: #1F1F1F;
  padding: 25px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.copyright {
  font-size: 13px;
  color: #999999;
  margin: 0;
}

/* FOOTER LEGAL */
.footer-legal {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 25px;
}

.footer-legal a {
  color: #999999;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.3s ease;
}

.footer-legal a:hover {
  color: #FFB8D1;
}

/* PAYMENT METHODS */
.payment-methods {
  display: flex;
  gap: 12px;
  align-items: center;
}

.payment-methods img {
  height: 24px;
  width: auto;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.payment-methods img:hover {
  opacity: 1;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .footer-column:first-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .footer-main {
    padding: 50px 0 30px;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-legal {
    flex-direction: column;
    gap: 10px;
  }
}
```

---

## 9. ELEMENTOS GLOBAIS E UTILITÁRIOS

### 9.1 Container e Grid System

```css
/* CONTAINER SYSTEM */
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.container-narrow {
  max-width: 1200px;
}

.container-wide {
  max-width: 1600px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }
}

/* GRID UTILITIES */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

@media (max-width: 968px) {
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }
}

@media (max-width: 568px) {
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
}
```

### 9.2 Buttons e CTAs

```css
/* BUTTON STYLES */
.btn {
  display: inline-block;
  padding: 14px 35px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

/* PRIMARY BUTTON */
.btn-primary {
  background: #FFB8D1;
  color: #FFFFFF;
  box-shadow: 0 6px 20px rgba(255, 184, 209, 0.3);
}

.btn-primary:hover {
  background: #FFA3C4;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 184, 209, 0.5);
}

/* SECONDARY BUTTON */
.btn-secondary {
  background: #2C2C2C;
  color: #FFFFFF;
}

.btn-secondary:hover {
  background: #1A1A1A;
  transform: translateY(-3px);
}

/* OUTLINE BUTTON */
.btn-outline {
  background: transparent;
  color: #2C2C2C;
  border: 2px solid #2C2C2C;
}

.btn-outline:hover {
  background: #2C2C2C;
  color: #FFFFFF;
}

/* BUTTON SIZES */
.btn-small {
  padding: 10px 25px;
  font-size: 12px;
}

.btn-large {
  padding: 18px 45px;
  font-size: 16px;
}

/* BUTTON FULL WIDTH */
.btn-block {
  display: block;
  width: 100%;
}
```

### 9.3 Spacing Utilities

```css
/* MARGIN UTILITIES */
.mt-0 { margin-top: 0; }
.mt-1 { margin-top: 10px; }
.mt-2 { margin-top: 20px; }
.mt-3 { margin-top: 30px; }
.mt-4 { margin-top: 40px; }
.mt-5 { margin-top: 60px; }
.mt-6 { margin-top: 80px; }

.mb-0 { margin-bottom: 0; }
.mb-1 { margin-bottom: 10px; }
.mb-2 { margin-bottom: 20px; }
.mb-3 { margin-bottom: 30px; }
.mb-4 { margin-bottom: 40px; }
.mb-5 { margin-bottom: 60px; }
.mb-6 { margin-bottom: 80px; }

/* PADDING UTILITIES */
.pt-0 { padding-top: 0; }
.pt-1 { padding-top: 10px; }
.pt-2 { padding-top: 20px; }
.pt-3 { padding-top: 30px; }
.pt-4 { padding-top: 40px; }
.pt-5 { padding-top: 60px; }
.pt-6 { padding-top: 80px; }

.pb-0 { padding-bottom: 0; }
.pb-1 { padding-bottom: 10px; }
.pb-2 { padding-bottom: 20px; }
.pb-3 { padding-bottom: 30px; }
.pb-4 { padding-bottom: 40px; }
.pb-5 { padding-bottom: 60px; }
.pb-6 { padding-bottom: 80px; }
```

### 9.4 Text Utilities

```css
/* TEXT ALIGNMENT */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

/* TEXT TRANSFORM */
.text-uppercase { text-transform: uppercase; }
.text-lowercase { text-transform: lowercase; }
.text-capitalize { text-transform: capitalize; }

/* FONT WEIGHTS */
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }

/* FONT SIZES */
.text-xs { font-size: 12px; }
.text-sm { font-size: 14px; }
.text-base { font-size: 16px; }
.text-lg { font-size: 18px; }
.text-xl { font-size: 20px; }
.text-2xl { font-size: 24px; }
.text-3xl { font-size: 30px; }
.text-4xl { font-size: 36px; }
```

---

## 10. ANIMAÇÕES E TRANSIÇÕES

### 10.1 Keyframe Animations

```css
/* FADE IN */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* FADE IN UP */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* FADE IN DOWN */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* SLIDE IN LEFT */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* SLIDE IN RIGHT */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* SCALE IN */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* BOUNCE */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

/* PULSE */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* SHIMMER */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

/* ROTATE */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### 10.2 Animation Classes

```css
/* ANIMATION UTILITIES */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out;
}

.animate-slide-in-left {
  animation: slideInLeft 0.8s ease-out;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out;
}

.animate-scale-in {
  animation: scaleIn 0.5s ease-out;
}

.animate-bounce {
  animation: bounce 2s infinite;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

/* ANIMATION DELAYS */
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }
```

### 10.3 Hover Effects

```css
/* HOVER LIFT */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

/* HOVER SCALE */
.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}

/* HOVER GLOW */
.hover-glow {
  transition: box-shadow 0.3s ease;
}

.hover-glow:hover {
  box-shadow: 0 0 30px rgba(255, 184, 209, 0.6);
}

/* HOVER UNDERLINE */
.hover-underline {
  position: relative;
  display: inline-block;
}

.hover-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #FFB8D1;
  transition: width 0.3s ease;
}

.hover-underline:hover::after {
  width: 100%;
}
```

---

## 11. RESPONSIVIDADE E MEDIA QUERIES

### 11.1 Breakpoints

```css
/* BREAKPOINTS DEFINITION */
:root {
  --breakpoint-xs: 480px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* EXTRA SMALL DEVICES (Phones) */
@media (max-width: 480px) {
  .hide-on-xs { display: none; }
  .show-on-xs { display: block; }
}

/* SMALL DEVICES (Tablets Portrait) */
@media (max-width: 640px) {
  .hide-on-sm { display: none; }
  .show-on-sm { display: block; }
}

/* MEDIUM DEVICES (Tablets Landscape) */
@media (max-width: 768px) {
  .hide-on-md { display: none; }
  .show-on-md { display: block; }
}

/* LARGE DEVICES (Desktops) */
@media (max-width: 1024px) {
  .hide-on-lg { display: none; }
  .show-on-lg { display: block; }
}

/* EXTRA LARGE DEVICES */
@media (min-width: 1280px) {
  .hide-on-xl { display: none; }
  .show-on-xl { display: block; }
}
```

### 11.2 Responsive Typography

```css
/* FLUID TYPOGRAPHY */
html {
  font-size: 16px;
}

@media (max-width: 1024px) {
  html {
    font-size: 15px;
  }
}

@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}

/* RESPONSIVE HEADINGS */
h1 {
  font-size: clamp(32px, 5vw, 72px);
}

h2 {
  font-size: clamp(26px, 4vw, 48px);
}

h3 {
  font-size: clamp(22px, 3vw, 36px);
}

h4 {
  font-size: clamp(20px, 2.5vw, 28px);
}

h5 {
  font-size: clamp(18px, 2vw, 24px);
}

h6 {
  font-size: clamp(16px, 1.5vw, 20px);
}
```

---

## 12. INTERAÇÕES E MICROINTERAÇÕES

### 12.1 Loading States

```css
/* SKELETON LOADER */
.skeleton {
  background: linear-gradient(
    90deg,
    #F5F5F5 0%,
    #E8E8E8 50%,
    #F5F5F5 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

.skeleton-text {
  height: 16px;
  margin-bottom: 10px;
}

.skeleton-title {
  height: 24px;
  width: 60%;
  margin-bottom: 15px;
}

.skeleton-image {
  width: 100%;
  aspect-ratio: 1 / 1;
}

/* SPINNER */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 184, 209, 0.2);
  border-top-color: #FFB8D1;
  border-radius: 50%;
  animation: rotate 1s linear infinite;
}

/* DOTS LOADER */
.dots-loader {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.dots-loader span {
  width: 12px;
  height: 12px;
  background: #FFB8D1;
  border-radius: 50%;
  animation: dotPulse 1.4s infinite ease-in-out;
}

.dots-loader span:nth-child(1) {
  animation-delay: -0.32s;
}

.dots-loader span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes dotPulse {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.3;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
```

### 12.2 Scroll Effects

```css
/* PARALLAX EFFECT */
.parallax-section {
  position: relative;
  overflow: hidden;
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  background-size: cover;
  background-position: center;
  will-change: transform;
}

/* FADE IN ON SCROLL */
.fade-in-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}

/* STICKY HEADER ON SCROLL */
.header-scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-scrolled .site-logo {
  height: 35px;
}
```

### 12.3 Form Interactions

```css
/* FLOATING LABELS */
.form-group {
  position: relative;
  margin-bottom: 25px;
}

.form-input {
  width: 100%;
  padding: 16px 16px 8px;
  border: 2px solid #E8E8E8;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #FFFFFF;
}

.form-input:focus {
  outline: none;
  border-color: #FFB8D1;
  box-shadow: 0 0 0 4px rgba(255, 184, 209, 0.1);
}

.form-label {
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 16px;
  color: #999999;
  pointer-events: none;
  transition: all 0.3s ease;
}

.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label {
  top: 6px;
  font-size: 12px;
  color: #FFB8D1;
}

/* CHECKBOX CUSTOM */
.custom-checkbox {
  position: relative;
  display: inline-block;
}

.custom-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.checkbox-box {
  width: 20px;
  height: 20px;
  border: 2px solid #E8E8E8;
  border-radius: 4px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-checkbox input[type="checkbox"]:checked + .checkbox-label .checkbox-box {
  background: #FFB8D1;
  border-color: #FFB8D1;
}

.checkbox-box::after {
  content: '✓';
  color: #FFFFFF;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.custom-checkbox input[type="checkbox"]:checked + .checkbox-label .checkbox-box::after {
  opacity: 1;
}
```

---

## 13. ACESSIBILIDADE

### 13.1 Focus States

```css
/* ACCESSIBLE FOCUS */
*:focus {
  outline: 2px solid #FFB8D1;
  outline-offset: 2px;
}

/* SKIP TO CONTENT */
.skip-to-content {
  position: absolute;
  top: -100px;
  left: 0;
  background: #2C2C2C;
  color: #FFFFFF;
  padding: 12px 24px;
  text-decoration: none;
  z-index: 9999;
  transition: top 0.3s ease;
}

.skip-to-content:focus {
  top: 0;
}

/* SCREEN READER ONLY */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* FOCUS VISIBLE */
.focus-visible:focus-visible {
  outline: 2px solid #FFB8D1;
  outline-offset: 4px;
}
```

### 13.2 Color Contrast

```css
/* HIGH CONTRAST MODE */
@media (prefers-contrast: high) {
  :root {
    --text-primary: #000000;
    --text-secondary: #333333;
    --primary-pink: #E0009D;
  }
}

/* REDUCED MOTION */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 14. PERFORMANCE E OTIMIZAÇÃO

### 14.1 Image Optimization

```css
/* LAZY LOADING */
img[loading="lazy"] {
  opacity: 0;
  transition: opacity 0.3s ease;
}

img[loading="lazy"].loaded {
  opacity: 1;
}

/* ASPECT RATIO CONTAINERS */
.aspect-ratio-16-9 {
  aspect-ratio: 16 / 9;
}

.aspect-ratio-4-3 {
  aspect-ratio: 4 / 3;
}

.aspect-ratio-1-1 {
  aspect-ratio: 1 / 1;
}

.aspect-ratio-3-4 {
  aspect-ratio: 3 / 4;
}

/* IMAGE PLACEHOLDERS */
.img-placeholder {
  background: linear-gradient(
    135deg,
    #F5F5F5 0%,
    #E8E8E8 100%
  );
  position: relative;
  overflow: hidden;
}

.img-placeholder::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.5),
    transparent
  );
  animation: shimmer 2s infinite;
}
```

### 14.2 Critical CSS

```css
/* ABOVE THE FOLD CRITICAL CSS */
/* Include only essential styles for initial render */

body {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #FFFFFF;
}

.hero-section {
  min-height: 100vh;
  position: relative;
}

/* Defer non-critical CSS */
```

---

## 15. TECNOLOGIAS E STACK RECOMENDADO

### 15.1 Front-End Stack

```markdown
**HTML/CSS/JavaScript:**
- HTML5 semântico
- CSS3 com Custom Properties
- JavaScript ES6+

**Framework/Library Options:**
- React.js (recomendado para componentes complexos)
- Next.js (para SSR e SEO)
- Vue.js (alternativa)

**CSS Framework:**
- Tailwind CSS (opcional, para acelerar desenvolvimento)
- CSS Modules (para escopo local)
- SCSS/SASS (para pré-processamento)

**Build Tools:**
- Vite (recomendado - ultra rápido)
- Webpack (mais robusto)
- Parcel (mais simples)

**Package Manager:**
- npm ou yarn ou pnpm
```

### 15.2 E-commerce Platform

```markdown
**Plataforma Recomendada:**
- Shopify (recomendado - usado pelo site KAHI original)
- WooCommerce (WordPress)
- Custom com Stripe

**Features Necessárias:**
- Carrinho de compras
- Checkout seguro
- Gerenciamento de inventário
- Sistema de avaliações
- Newsletter integration
- Analytics tracking
```

### 15.3 Integrações

```markdown
**Payment Gateways:**
- Stripe
- PayPal
- Mercado Pago (para Argentina)

**Email Marketing:**
- Klaviyo
- Mailchimp
- SendGrid

**Analytics:**
- Google Analytics 4
- Hotjar (heatmaps)
- Meta Pixel (Facebook/Instagram)

**Reviews:**
- Yotpo
- Judge.me
- Stamped.io

**Social Media:**
- Instagram Feed API
- Facebook Shop Integration
- TikTok Pixel
```

---

## 16. ASSETS E RECURSOS NECESSÁRIOS

### 16.1 Imagens

```markdown
**Logo:**
- Logo principal (SVG + PNG)
- Logo alternativa (branco para footer)
- Favicon (múltiplos tamanhos)

**Produtos:**
- Imagens de produtos (alta resolução, fundo branco)
- Lifestyle shots (produtos em uso)
- Close-ups de texturas
- Tamanhos: 2000x2000px mínimo

**Hero/Banners:**
- Hero video ou imagem (1920x1080px)
- Banner de promoções (1920x600px)
- Mobile banners (750x1000px)

**Ingredientes:**
- Ilustrações de moléculas
- Fotos de ingredientes naturais
- Infográficos

**Ícones:**
- Set completo de ícones (SVG)
- Social media icons
- Payment method icons
```

### 16.2 Fontes

```markdown
**Fonte Principal: Montserrat**
- Weights: 300, 400, 500, 600, 700
- Fonte do Google: https://fonts.google.com/specimen/Montserrat

**Fonte Secundária: Lato**
- Weights: 400, 700
- Fonte do Google: https://fonts.google.com/specimen/Lato

**Fonte Accent (opcional): Playfair Display**
- Para títulos especiais
- Fonte do Google: https://fonts.google.com/specimen/Playfair+Display
```

---

## 17. SEO E META TAGS

### 17.1 Meta Tags Essenciais

```html
<!-- Primary Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="title" content="BLUMIN - Linha KAHI | Premium Korean Skincare">
<meta name="description" content="Discover KAHI's innovative Korean skincare products at BLUMIN. Multi-purpose balm sticks with Salmon DNA, Jeju Oil, and FILMEXEL™ technology for youthful, radiant skin.">
<meta name="keywords" content="KAHI cosmetics, Korean skincare, multi balm stick, salmon DNA skincare, K-beauty, anti-aging, wrinkle care, BLUMIN">
<meta name="author" content="BLUMIN">
<meta name="robots" content="index, follow">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://blumin.com/">
<meta property="og:title" content="BLUMIN - Linha KAHI | Premium Korean Skincare">
<meta property="og:description" content="Discover KAHI's innovative Korean skincare products at BLUMIN.">
<meta property="og:image" content="https://blumin.com/og-image.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://blumin.com/">
<meta property="twitter:title" content="BLUMIN - Linha KAHI | Premium Korean Skincare">
<meta property="twitter:description" content="Discover KAHI's innovative Korean skincare products at BLUMIN.">
<meta property="twitter:image" content="https://blumin.com/twitter-image.jpg">

<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Schema.org Markup -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "BLUMIN",
  "description": "Premium Korean Skincare - KAHI Line",
  "url": "https://blumin.com",
  "logo": "https://blumin.com/logo.png",
  "image": "https://blumin.com/store-image.jpg",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AR"
  }
}
</script>
```

---

## 18. CHECKLIST DE IMPLEMENTAÇÃO

### 18.1 Fase 1: Setup (Semana 1)

```markdown
☐ Configurar ambiente de desenvolvimento
☐ Instalar dependências (React, Tailwind, etc.)
☐ Criar estrutura de pastas
☐ Configurar build tools (Vite/Webpack)
☐ Setup repositório Git
☐ Configurar ESLint e Prettier
```

### 18.2 Fase 2: Design System (Semana 1-2)

```markdown
☐ Definir variáveis CSS (cores, fontes, espaçamentos)
☐ Criar componentes base (buttons, inputs, cards)
☐ Implementar grid system
☐ Setup tipografia responsiva
☐ Criar biblioteca de ícones
☐ Documentar design system
```

### 18.3 Fase 3: Componentes (Semana 2-3)

```markdown
☐ Header/Navigation
☐ Hero Section com vídeo
☐ Products Grid
☐ Product Card
☐ Ingredients Section
☐ FAQ Section
☐ Newsletter Form
☐ Footer
☐ Mobile Menu
```

### 18.4 Fase 4: Páginas (Semana 3-4)

```markdown
☐ Homepage
☐ Product Listing Page
☐ Product Detail Page
☐ Cart Page
☐ Checkout Page
☐ About Page
☐ Contact Page
☐ 404 Page
```

### 18.5 Fase 5: E-commerce (Semana 4-5)

```markdown
☐ Integrar carrinho de compras
☐ Setup Stripe/Payment Gateway
☐ Implementar checkout
☐ Sistema de inventário
☐ Email confirmations
☐ Order tracking
```

### 18.6 Fase 6: Otimização (Semana 5-6)

```markdown
☐ Otimizar imagens
☐ Implementar lazy loading
☐ Setup caching
☐ Minimizar CSS/JS
☐ SEO optimization
☐ Accessibility audit
☐ Performance testing (Lighthouse)
☐ Cross-browser testing
```

### 18.7 Fase 7: Launch (Semana 6)

```markdown
☐ Deploy para staging
☐ Testes finais
☐ Setup analytics
☐ Configurar domínio
☐ SSL certificate
☐ Deploy para produção
☐ Monitor performance
```

---

## 19. RECURSOS ADICIONAIS

### 19.1 Tools Recomendadas

```markdown
**Design:**
- Figma (para protótipos e design)
- Adobe Photoshop (edição de imagens)
- Canva (assets rápidos)

**Development:**
- VS Code (editor de código)
- Chrome DevTools (debugging)
- Postman (API testing)

**Testing:**
- Lighthouse (performance)
- BrowserStack (cross-browser)
- WAVE (accessibility)

**Monitoring:**
- Google Analytics
- Hotjar
- Sentry (error tracking)
```

### 19.2 Referências de Design

```markdown
**Sites de Inspiração:**
- https://kahicosmetics.com
- https://www.sephora.com
- https://www.glossier.com
- https://www.fentybeauty.com
- https://www.rarebeauty.com

**Design Systems:**
- Material Design
- Apple Human Interface Guidelines
- Shopify Polaris
```

---

## 20. OBSERVAÇÕES FINAIS IMPORTANTES

### 20.1 Pontos Críticos

```markdown
**PRIORIDADES:**
1. Mobile-first design (maioria dos usuários em mobile)
2. Performance (site deve carregar em menos de 3 segundos)
3. Imagens de alta qualidade (essencial para produtos de beleza)
4. Checkout simples e rápido (reduzir abandono de carrinho)
5. Trust signals (reviews, garantias, segurança)

**DIFERENCIAÇÃO PARA BLUMIN:**
- Adaptar paleta de cores se necessário (manter DNA da marca BLUMIN)
- Incluir elementos da identidade visual BLUMIN
- Localização para Argentina (idioma, moeda, métodos de pagamento)
- Integrar com redes sociais da BLUMIN (Instagram, etc.)

**CONFORMIDADE:**
- LGPD (Brasil) compliance
- Cookie consent banner
- Políticas de privacidade e termos
- Acessibilidade WCAG 2.1 AA
```

### 20.2 Métricas de Sucesso

```markdown
**Performance Goals:**
- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

**Conversion Goals:**
- Add to Cart Rate: 15%+
- Cart Abandonment: < 70%
- Average Order Value: tracking
- Customer Retention: 30%+
```

---

## CONCLUSÃO

Esta documentação fornece uma base sólida e completa para recriar um site no estilo KAHI Cosmetics para a loja BLUMIN. Todos os elementos de design, código, estrutura e funcionalidades foram detalhados tecnicamente.

**Próximos Passos:**
1. Revisar toda a documentação
2. Preparar assets (imagens, logos, vídeos)
3. Configurar ambiente de desenvolvimento
4. Iniciar implementação seguindo o checklist
5. Testes rigorosos antes do launch

**Contato para Dúvidas:**
Esta documentação foi criada para ser autocontida, mas qualquer dúvida durante a implementação pode ser esclarecida.

---

**Versão:** 1.0
**Data:** 2025
**Criado para:** BLUMIN - Linha KAHI
**Stack Recomendado:** React.js + Tailwind CSS + Shopify

---

✨ **BOA SORTE COM O DESENVOLVIMENTO!** ✨
