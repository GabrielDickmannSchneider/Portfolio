document.addEventListener('DOMContentLoaded', function() {
  const toastTrigger = document.getElementById('liveToastBtn');
  const toastLiveExample = document.getElementById('liveToast');

  if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener('click', () => {
      toastBootstrap.show();
    });
  }

  const dropdownItems = document.querySelectorAll('.dropdown-menu li a');
  const contentSections = document.querySelectorAll('.school-content > div');

  dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
      dropdownItems.forEach(item => {
        item.classList.remove('active');
      });

      this.classList.add('active');

      const target = this.getAttribute('data-target');

      contentSections.forEach(section => {
        section.classList.remove('active');
      });

      const targetContent = document.querySelector('.' + target);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  const navLinks = document.querySelectorAll('.nav-link');
  const contents = document.querySelectorAll('.content');

  navLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
      navLinks.forEach((link) => {
        link.parentNode.classList.remove('active');
      });
      link.parentNode.classList.add('active');

      contents.forEach((content) => {
        content.classList.remove('active');
      });
      contents[index].classList.add('active');
    });
  });

  const rotateBtns = document.querySelectorAll(".rotate-btn");

  rotateBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const cardId = this.getAttribute("data-card");
      const card = document.getElementById(cardId);
      const faces = card.querySelectorAll(".face-front, .face-back");

      faces.forEach(face => {
        face.classList.toggle("active");
      });
    });
  });
});