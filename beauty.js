const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    const update = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        const increment = Math.ceil(target / 80);

        if(current < target){
            counter.innerText = current + increment;
            setTimeout(update, 30);
        } else {
            counter.innerText = target + "+";
        }
    };
    update();
});
