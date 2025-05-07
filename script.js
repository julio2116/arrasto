const items = document.querySelectorAll('.item');
        const zonas = document.querySelectorAll('.zona');

        document.addEventListener('DOMContentLoaded', () => {
            const mount = JSON.parse(localStorage.getItem('data'));
            console.log(mount)
            if (mount) {
                for (const [item, zona] of Object.entries(mount)) {
                    const zonaElement = document.querySelector(`#${zona}`);
                    const itemElement = document.querySelector(`#${item}`);
                    zonaElement.appendChild(itemElement);
                }
            }
        })

        items.forEach(item => {
            item.addEventListener('dragstart', (event) => {
                item.classList.add('dragging');
                event.dataTransfer.setData("text/plain", event.target.id)
            });
            item.addEventListener('dragend', () => {
                item.classList.remove('dragging')
            });
        });

        zonas.forEach(zona => {
            zona.addEventListener('dragleave', () => {
                zona.classList.remove('leaving');
            })
            zona.addEventListener('dragover', (event) => {
                zona.classList.add('leaving');
                event.preventDefault();
            })
            zona.addEventListener('drop', (event) => {
                const itemId = event.dataTransfer.getData('text');
                const element = document.querySelector(`#${itemId}`);
                zona.appendChild(element);
                zona.classList.remove('leaving');
                const zonaId = event.currentTarget.id;
                const currentLocation = JSON.parse(localStorage.getItem('data')) || {};

                const newItems = { ...currentLocation, [itemId]: zonaId }
                localStorage.setItem('data', JSON.stringify(newItems));
            })
        })