// 磯部歯科クリニック - メインJS

document.addEventListener('DOMContentLoaded', () => {

  // --- ハンバーガーメニュー ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // モバイルナビのサブメニュー開閉
  document.querySelectorAll('.mobile-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const submenu = btn.nextElementSibling;
      if (submenu) {
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        btn.querySelector('.arrow')?.classList.toggle('rotated');
      }
    });
  });

  // --- FAQ アコーディオン ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // 全部閉じる
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // クリックしたやつを開く
      if (!isOpen) item.classList.add('open');
    });
  });

  // --- フェードインアニメーション ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // --- トップに戻る ---
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 現在ページのナビをアクティブに ---
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-list > li > a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace(/^\.\//, ''))) {
      link.closest('li').classList.add('active');
    }
  });

});
