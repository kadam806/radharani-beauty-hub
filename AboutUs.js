/* SCROLL REVEAL */
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if(top < window.innerHeight - 100){
            el.classList.add('active');
        }
    });
});

/* SKILL PROGRESS */
document.querySelectorAll('.skill-circle').forEach(skill=>{
    const percent = skill.dataset.percent;
    const circle = skill.querySelectorAll('circle')[1];
    const offset = 377 - (377 * percent / 100);
    setTimeout(()=>{
        circle.style.strokeDashoffset = offset;
    },800);
});

/* TESTIMONIAL SWITCH */
const testimonials = [
    ["Radharani Salon made my special day perfect.","— Anjali Patil"],
    ["Clean, calm and very professional.","— Sneha Kulkarni"],
    ["Best salon experience I’ve had.","— Riya Deshmukh"]
];

let i = 0;
setInterval(()=>{
    i = (i+1)%testimonials.length;
    document.getElementById("quote").innerText = testimonials[i][0];
    document.getElementById("author").innerText = testimonials[i][1];
},4500);
