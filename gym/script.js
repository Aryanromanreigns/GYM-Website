// Navbar burger toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth scroll & active link highlight
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });

    navItems.forEach(item => item.classList.remove('active'));
    this.classList.add('active');

    if(navLinks.classList.contains('active')) navLinks.classList.remove('active');
  });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if(pageYOffset >= sectionTop) current = section.getAttribute('id');
  });
  navItems.forEach(li => {
    li.classList.remove('active');
    if(li.getAttribute('href') === '#' + current) li.classList.add('active');
  });
});

// Animate Counters
function animateCounter(id, end, duration) {
  let obj = document.getElementById(id);
  let start = 0;
  let stepTime = Math.abs(Math.floor(duration / end));
  let timer = setInterval(() => {
    start += 1;
    obj.innerText = start;
    if(start == end) clearInterval(timer);
  }, stepTime);
}

let statsSection = document.getElementById('stats');
let statsStarted = false;
window.addEventListener('scroll', () => {
  let sectionTop = statsSection.offsetTop - window.innerHeight + 100;
  if(!statsStarted && window.pageYOffset > sectionTop){
    animateCounter('members', 1200, 2000);
    animateCounter('trainers-count', 25, 2000);
    animateCounter('classes', 40, 2000);
    animateCounter('calories', 50000, 2000);
    statsStarted = true;
  }
});

// BMI Calculator
document.getElementById('bmi-form').addEventListener('submit', function(e){
  e.preventDefault();
  let weight = parseFloat(document.getElementById('weight').value);
  let height = parseFloat(document.getElementById('height').value)/100;
  let bmi = (weight / (height*height)).toFixed(1);
  let resultText = `Your BMI is ${bmi}. `;
  if(bmi < 18.5) resultText += "Underweight";
  else if(bmi < 25) resultText += "Normal weight";
  else if(bmi < 30) resultText += "Overweight";
  else resultText += "Obese";
  document.getElementById('bmi-result').innerText = resultText;
});

// Pricing Toggle
const monthlyBtn = document.getElementById('monthly-btn');
const yearlyBtn = document.getElementById('yearly-btn');
const planPrices = document.querySelectorAll('.plan-card .price');

monthlyBtn.addEventListener('click', () => {
  monthlyBtn.classList.add('active');
  yearlyBtn.classList.remove('active');
  planPrices[0].innerText = '$30/month';
  planPrices[1].innerText = '$50/month';
  planPrices[2].innerText = '$80/month';
});

yearlyBtn.addEventListener('click', () => {
  yearlyBtn.classList.add('active');
  monthlyBtn.classList.remove('active');
  planPrices[0].innerText = '$300/year';
  planPrices[1].innerText = '$500/year';
  planPrices[2].innerText = '$800/year';
});

// Newsletter Modal
const modal = document.getElementById('newsletter-modal');
const closeBtn = document.querySelector('.close');
window.addEventListener('load', () => {
  setTimeout(()=>{ modal.style.display = 'block'; },5000);
});
closeBtn.addEventListener('click', ()=>{ modal.style.display='none'; });
window.addEventListener('click', e => { if(e.target==modal) modal.style.display='none'; });

// Back to Top
const backTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backTop.style.display = window.scrollY > 500 ? 'block' : 'none';
});
backTop.addEventListener('click', ()=>{ window.scrollTo({top:0,behavior:'smooth'}); });
