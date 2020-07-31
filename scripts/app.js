let app = {
    config: {
        rows: [8, 7, 6, 5, 4, 3, 2, 1],
        cols: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    },
    run() {
        let board = this.createBoard();
        //добавляем доску в body
        document.body.innerHTML = board;

        //Добавляет колонку с номером строк
        this.insertRowsNumbers()
        //Добавляет строку с названием колонок
        this.insertColsChars()
    },

    /**
     * Метод генерирует игровое поле 8 на 8
     * @returns {string} html разметка в виде строки.
     */
    createBoard() {
        let board = '';
        let startColor = 'white';
        for (let i = 0; i < this.config.rows.length; i++) {
            let row = '';
            if (startColor == 'white') {
                row = this.createRow(startColor, this.config.rows[i]);
                startColor = 'black';
            } else {
                row = this.createRow(startColor, this.config.rows[i]);
                startColor = 'white';
            }
            board += row;
        }
        return `<table><tbody>${board}</tbody></table>`;
    },
    /**
     * Метод генерирует тег tr (строку игровой доски) с закрашенными тегами
     * td (ячейками)
     * @param {string} startColor с какого цвета начинается строка от левого края
     * 'black' or 'white'
     * 
     * @param {string} rowNum номер строки от 8 до 1 т.к. генерируется сверху вниз.
     * сверху вниз, поэтому начинается номер от 8
     * @returns {string} html-разметка, тег tr с оформленными внутри тегами td
     */
    createRow(startColor, rowNum) {
        let currentColorClass = startColor;
        let row = '';
        for (let i = 0; i < this.config.cols.length; i++) {
            let field = '';
            if (currentColorClass === 'white') {
                field = this.createField('white', rowNum, this.config.cols[i]);
                currentColorClass = 'blackField';
            } else {
                field = this.createField('black', rowNum, this.config.cols[i]);
                currentColorClass = 'white';
            }
            row += field;
        }
        return `<tr>${row}</tr>`
    },
    /**
     * Метод генерирует ячейку (тег td) с нужным классом цвета
     * и координатами на поле.
     * @param {string} color класс цвета ячейки, может быть white or black 
     * @param {number} rowNum номер строки игровой доски 
     * @param {string} colChar буква колонки игровой доски
     * @returns {string} html-разметка с заполненными атрибутами координат и классом цвета. 
     */
    createField(color, rowNum, colChar) {
        return `<td data-rownum="${rowNum}" data-colchar="${colChar}" class="${color}"></td>`
    },

    /**
     * Метод вставляет на существующую доску колонку
     * слева, с указанием номером строки
     */
    insertRowsNumbers() {
        let trs = document.querySelectorAll('tr');
        for (let i = 0; i < trs.length; i++) {
            let td = document.createElement('td');
            td.innerText = this.config.rows[i];
            trs[i].insertAdjacentElement('afterbegin', td);
        }
    },

    /**
     * Метод создает строку (tr) с названием колонов ввиде букв,
     * а так же в начале вставляет пустую ячейку
     * под цифрами
     */

    insertColsChars() {
        let tr = document.createElement('tr');
        tr.innerHTML += '<td></td>';
        for (let i = 0; i < this.config.cols.length; i++) {
            tr.innerHTML += `<td>${this.config.cols[i].toUpperCase()}</td>`;

        }
        let tbody = document.querySelector('tbody');
        tbody.insertAdjacentElement('beforeend', tr);
    },
}

app.run();