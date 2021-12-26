export function snowflakeFall(x: boolean): void {
    if (x == true) {
        return;
    } else {
        if ((document.getElementById('snowflake') as HTMLElement).classList.contains('off')) {
            setInterval(() => {
                const snowflakeUnit = document.createElement('i') as HTMLElement;
                snowflakeUnit.innerHTML = '*';
                snowflakeUnit.classList.add('fas');
                snowflakeUnit.classList.add('fa-snowflake');
                snowflakeUnit.style.left = Math.random() * window.innerWidth + 'px';
                snowflakeUnit.style.animationDuration = Math.random() * 4 + 2 + 's'; // between 2 - 5 seconds
                snowflakeUnit.style.opacity = Math.random().toString();
                snowflakeUnit.style.fontSize = Math.random() * 15 + 10 + 'px';
                document.body.appendChild(snowflakeUnit);
                setTimeout(() => {
                    snowflakeUnit.remove();
                }, 5000);
            }, 50);
        }
    }
}
