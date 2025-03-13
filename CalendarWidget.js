// CalendarUI class - handles all UI-related functionality
class CalendarUI {
    constructor(host, shadow, fontConfig, designConfig,isCustomModalSelect) {
        this.host = host;
        this.shadow = shadow;
        this.fontConfig = fontConfig;
        this.designConfig = designConfig
        this.IS_CUSTOM_MODAL = isCustomModalSelect
        this.loadStyles();
        this.loadHtmls();
        console.log("CalendarUI::", designConfig);
        console.log("CalendarUI::", fontConfig);
    }

    loadStyles() {
        try {
            const style = document.createElement("style");
            style.textContent = `
            * {
                padding: 0%;
                margin: 0%;
                box-sizing: border-box;
            }
            :host {
                --fontPrimary: ${this.fontConfig.fontFamily || "monospace"} !important;
                --fontSize: ${this.fontConfig.fontSize}+${this.fontConfig.fontSizeType} !important;
                --fontStye:${this.fontConfig.fontStyle} !important;
                --fontWeight:${this.fontConfig.fontWeight} !important;


                --colorAccent:${this.designConfig.colorAccent} !important;

                --backgroundColor: ${this.designConfig.colorBackground} !important;

                --colorAvailableBox:${this.designConfig.colorAvailableBox} !important;
                --colorAvailableBoxFont:${this.designConfig.colorAvailableBoxFont} !important;

                --colorUnavailableBox:${this.designConfig.colorUnavailableBox} !important;
                --colorUnavailableBoxFont:${this.designConfig.colorUnavailableBoxFont} !important;

                --colorBookedBox:${this.designConfig.colorBookedBox} !important;
                --colorBookedBoxFont:${this.designConfig.colorBookedBoxFont} !important;

                --colorSelectedBox:${this.designConfig.colorSelectedBox} !important;
                --colorSelectedBoxFont:${this.designConfig.colorSelectedBoxFont} !important;

                --bgColorPrevNextBox: ${this.designConfig.colorPrevNextBox}) !important;
                --textColorPrevNextBox: ${this.designConfig.colorPrevNextFont}) !important;
                
                
            }

            .ce__calendar__container {
                width: 100%;
                height: 100%;
                background-color: var(--backgroundColor,white) !important;
                border-radius: 10px;
                overflow: hidden;
                display: grid;
                grid-template-columns: repeat(1, 1fr);
                grid-template-rows: repeat(8, 1fr);
                font-family: var(--fontPrimary) !important;
                position: relative;
            }

            .ce__calendar__top {
                grid-row: span 1 / span 1;
                display: grid;
                grid-template-columns: 30% 70%;
                grid-template-rows: repeat(1, 1fr);
            }

            .ce__calendar__top__left {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .ce__calendar__top__left #ce__calendar__date {
                font-size: xx-large;
                font-weight: bolder;
                color: var(--colorAccent) !important;
            }
            .ce__calendar__top__left #ce__calendar__month__year {
                font-size: medium;
                color: var(--colorAccent) !important;
                font-weight: bold;
            }
            .ce__calendar__top__right {
                display: grid;
                grid-template-rows: 1fr;
                grid-template-columns: auto auto;
                place-items: center;
                grid-auto-flow: column;
            }
            .ce__calendar__top__right__prevNextBtns svg:hover path {
                fill: var(--colorAccent) !important;
            }
            .ce__calendar__top__right__prevNextBtns svg {
                width: 2rem;
                max-width: 50px;
                min-width: 24px;
                max-height: 50px;
                height: 2rem;
                min-height: 24px;
            }

            .ce__calendar__top__right__year,
            .ce__calendar__top__right__month {
                color: var(--colorAccent) !important;
                font-size: larger;
                font-weight: bolder;
            }

            .ce__calendar__bottom {
                grid-row: span 7 / span 7;
                grid-row-start: 2;
                background-color: var(--backgroundColor) !important;

                display: grid;
                grid-template-rows: 15% auto;
                grid-template-columns: 1;
                padding: 0px 10px 10px 10px;
            }
            #ce__calendar__bottom__days {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                grid-template-rows: repeat(1, 1fr);
                place-items: center;
                gap: 10px;
            }
            #ce__calendar__bottom__days p {
                background-color: var(--backgroundColorWhite,--backgroundColor) !important;
                height: 75%;
                width: 100%;
                border-radius: 10px;
                display: grid;
                place-items: center;
                color: var(--colorAccent) !important;
                font-weight: bold;
                font-size: larger;
            }

            #ce__calendar__bottom__date {
                display: grid;
                grid-template-rows: repeat(6, 1fr);
                grid-template-columns: repeat(7, 1fr);
                place-items: center;
                gap: 10px;
            }
            #ce__calendar__bottom__date p {
                // background-color: var(--backgroundColorWhite);
                height: 100%;
                width: 100%;
                border-radius: 10px;
                display: grid;
                place-items: center;
                // font-family: var(--fontPrimary);
                font-size: x-large;
                font-weight: bold;
            }
            .ce__calendar__bottom__date__previous , .ce__calendar__bottom__date__next {
                color: var(--textColorPrevNextBox,grey) !important;
                background-color:var(--bgColorPrevNextBox,white) !important;
            }


            


            /* modal*/

            .modal-window {
                color: red;
                position: fixed;
                background-color: rgba(88, 88, 88, 0.416);
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 999;
                visibility: hidden;
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s;
                position: absolute;
                width: 100%;
                height: 100%;
            }

            .modal-window.show {
                visibility: visible;
                opacity: 1;
                pointer-events: auto;
            }

            .modal-window > div {
                width: 70%;
                height: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                padding: 2em;
                background: var(--backgroundColor,white);
                border-radius: 1rem;
                overflow: hidden;
            }

            .modal-close {
                position: absolute;
                right: 10px;
                top: 10px;
                cursor: pointer;
            }

            .modal-close:hover {
                fill: rgb(145, 142, 142);
            }


            .ce__calendar__bottom__date__curr.available.selected {
                background-color: var(--colorSelectedBox,rgb(245, 93, 59)) !important;
                color: var(--colorSelectedBoxFont,white) !important;
                border-radius: 50%;
                transition: background-color 0.3s ease, transform 0.2s ease;
            }
            
            .ce__calendar__bottom__date__curr.available {
                background-color: var(--colorAvailableBox, white) !important;
                color: var(--colorAvailableBoxFont, black) !important;
                cursor: pointer;
        }

        .ce__calendar__bottom__date__curr.unavailable {
                background-color: var(--colorUnavailableBox,cyan) !important;
                color: var(--colorUnavailableBoxFont,black) !important;
                cursor: not-allowed;
                opacity: 0.7;
        }

        .ce__calendar__bottom__date__curr.booked {
                background-color: maroon !important;
                color: white !important;
                cursor: not-allowed;
                opacity: 0.7;
        }
           

            `;
            this.shadow.append(style);
        } catch (error) {
            console.log("STYLE LOADED :: ERROR :: ", error);
        }
    }

    loadHtmls() {
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="ce__calendar__top">
                <div class="ce__calendar__top__left">
                    <div id="ce__calendar__date">-</div>
                    <div id="ce__calendar__month__year">-</div>
                </div>
                <div class="ce__calendar__top__right">
                    <div class="ce__calendar__top__right__btnclikedData">
                        <p id="ce__calendar__top__right__year">-</p>
                        <p id="ce__calendar__top__right__month">-</p>
                    </div>
                    <div class="ce__calendar__top__right__prevNextBtns">
                        <svg
                            width="30"
                            height="30"
                            viewBox="-5 0 25 25"
                            xmlns="http://www.w3.org/2000/svg"
                            id="monthPrevBtn"
                        >
                            <path
                                d="M11.546.57.698 10.994l-.09.08c-.363.35-.576.813-.608 1.364l.002.185c.03.49.243.954.664 1.354l-.005-.008 10.885 10.462a2.06 2.06 0 0 0 2.845 0 1.964 1.964 0 0 0 0-2.844l-9.403-9.03 9.403-9.144a1.964 1.964 0 0 0 0-2.844 2.06 2.06 0 0 0-2.845 0"
                                fill="#1C1C1F"
                            />
                        </svg>
                        <svg
                            width="30"
                            height="30"
                            viewBox="-5 0 25 25"
                            xmlns="http://www.w3.org/2000/svg"
                            id="monthNextBtn"
                        >
                            <path
                                d="m3.454.57 10.848 10.424.09.08c.363.35.576.813.608 1.364l-.002.185c-.03.49-.243.954-.664 1.354l.005-.008L3.454 24.431a2.06 2.06 0 0 1-2.845 0 1.964 1.964 0 0 1 0-2.844l9.403-9.03L.609 3.413a1.964 1.964 0 0 1 0-2.844 2.06 2.06 0 0 1 2.845 0"
                                fill="#1C1C1F"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="ce__calendar__bottom">
                <div id="ce__calendar__bottom__days">
                    <!-- DYAMNICALLY ADDED DAYS -->
                </div>
                <div id="ce__calendar__bottom__date">
                    <!-- DYAMNICALLY ADDED DATES -->
                </div>


        <div id="modal" class="modal-window">
            <div>
                <svg
            class="modal-close"
            id="close-modal-btn"
            width="30"
            height="30"
            viewBox="0 0 12 12" 
            xmlns="http://www.w3.org/2000/svg"
            fill="black"
          >
            <path
              d="m7.314 5.9 3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"
            />
             </svg>
            <h1>Modal Message Type: <span>Erorr</span></h1>
            <p>ERROR MESSAGE</p>
        </div>
        </div>
      
            </div>
        `;
        div.setAttribute("class", "ce__calendar__container");
        this.shadow.append(div);
    }

    renderCalendarWeekDays(language, dayFormat) {
        const container = this.shadow.getElementById("ce__calendar__bottom__days");
        container.textContent = ""; // Clear existing content
        const fragment = document.createDocumentFragment();
        const baseDate = new Date(Date.UTC(2025, 0, 5));

        for (let i = 0; i < 7; i++) {
            let date = new Date(baseDate);
            date.setUTCDate(baseDate.getUTCDate() + i);

            let day = date.toLocaleString(language, { weekday: dayFormat });
            let p = document.createElement("p");
            p.textContent = day;
            fragment.appendChild(p);
        }

        container.appendChild(fragment);
    }

    renderCalendarCurrentMonthYearDate(date, year, month, language, monthFormat) {
        const dateEl = this.shadow.getElementById("ce__calendar__date");
        const monthYearEl = this.shadow.getElementById("ce__calendar__month__year");

        const monthName = new Date(year, month).toLocaleString(language, {
            month: monthFormat
        });

        dateEl.textContent = String(date).padStart(2, "0");
        monthYearEl.textContent = `${monthName} ${year}`;
    }

    renderCalendarDays(days) {
        const container = this.shadow.getElementById("ce__calendar__bottom__date");
        container.textContent = ""; // Clear existing content
        const fragment = document.createDocumentFragment();

        days.forEach(({ day, type }) => {
            const p = document.createElement("p");
            p.classList.add(`ce__calendar__bottom__date__${type}`);
            p.textContent = day;
            fragment.appendChild(p);
        });

        container.appendChild(fragment);
    }

    setNextPrevBtnClickedData(year, month, language, monthFormat) {
        const yearElem = this.shadow.getElementById("ce__calendar__top__right__year");
        const monthElem = this.shadow.getElementById("ce__calendar__top__right__month");

        if (!yearElem || !monthElem) return; // Prevent errors if elements are missing

        yearElem.textContent = year;
        const date = new Date(Date.UTC(year, month, 1));
        const monthStr = date.toLocaleString(language, { month: monthFormat }).toUpperCase();

        monthElem.textContent = monthStr;
        monthElem.value = month;
    }

    clearSelections() {
        this.shadow.querySelectorAll(".ce__calendar__bottom__date__curr.available.selected").forEach((day) =>
            day.classList.remove("selected")
        );
    }

    // animateSelection(dates, month, year,bookedDates,unavailableDates) {
    //     const allDates = this.shadow.querySelectorAll(".ce__calendar__bottom__date__curr");

    //     allDates.forEach((day, index) => {
    //         const dayNum = Number(day.textContent);
    //         const currentDate = new Date(year, month, dayNum);
    //         const formattedDate = currentDate.toISOString().split('T')[0];
    //         console.log(formattedDate);
    //         if (bookedDates.includes(formattedDate) || unavailableDates.includes(formattedDate)) {
    //             this.showModal("SELECTED DATE RANGE HAVING BOOKED AND UNAWVALBLE RANGE...","error")
    //             return
    //         }
    //         else if (dates.includes(formattedDate)) {
    //             setTimeout(() => {
    //                 day.classList.add("selected");
    //                 day.style.transition = "background-color 0.3s ease, transform 0.2s ease";
    //                 day.style.transform = "scale(1.1)"; // Slight bounce effect
    //             }, index * 50); // Delay each item's animation slightly
    //         }
    //     });

    //     // Reset transform after animation
    //     setTimeout(() => {
    //         allDates.forEach((day) => (day.style.transform = "scale(1)"));
    //     }, dates.length * 50 + 200);
    // }
    animateSelection(dates, month, year, bookedDates, unavailableDates) {
        const allDates = this.shadow.querySelectorAll(".ce__calendar__bottom__date__curr");
        let stopSelection = false; // Flag to stop selection once a blocked date is encountered

        allDates.forEach((day, index) => {
            const dayNum = Number(day.textContent);
            const currentDate = new Date(year, month, dayNum);
            const formattedDate = currentDate.toISOString().split('T')[0];

            if (dates.includes(formattedDate)) {
                if (stopSelection) return; // Stop processing further dates

                if (bookedDates.includes(formattedDate) || unavailableDates.includes(formattedDate)) {
                    if (!this.IS_CUSTOM_MODAL) {
                        this.showModal("STOPPING SELECTION: Encountered BOOKED or UNAVAILABLE date.", "error");
                    }
                    stopSelection = true; // Prevent selecting beyond this date
                    return;
                }

                // Apply animation for valid dates
                setTimeout(() => {
                    day.classList.add("selected");
                    day.style.transition = "background-color 0.3s ease, transform 0.2s ease";
                    day.style.transform = "scale(1.1)"; // Slight bounce effect
                }, index * 50);
            }
        });

        // Reset transform after animation
        setTimeout(() => {
            allDates.forEach((day) => (day.style.transform = "scale(1)"));
        }, dates.length * 50 + 200);
    }

    getMonthYearElements() {
        return {
            yearElem: this.shadow.getElementById("ce__calendar__top__right__year"),
            monthElem: this.shadow.getElementById("ce__calendar__top__right__month")
        };
    }

    getNavigationButtons() {
        return {
            nextBtn: this.shadow.getElementById("monthNextBtn"),
            prevBtn: this.shadow.getElementById("monthPrevBtn")
        };
    }

    getDateContainer() {
        return this.shadow.getElementById("ce__calendar__bottom__date");
    }

    showModal(message, type = "error") {
        const closeModalBtn = this.shadow.getElementById("close-modal-btn");
        const modal = this.shadow.getElementById("modal");
        const childList = modal.children[0].children
        childList[1].children[0].textContent = type
        childList[2].textContent = message

        modal.classList.add("show");

        closeModalBtn.addEventListener("click", function () {
            modal.classList.remove("show");
        });

        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.classList.remove("show");
            }
        });
    }
}

// CalendarFunctionality class - handles all calendar logic and functionality
class CalendarFunctionality {
    constructor(config) {
        console.log("CalendarFunctionality::", config);
        this.CONFIG = config
        this.DATE = new Date();
        this.CALENDAR_BOXES = 42;
        this.LANGUAGE = config.language || "en";
        this.LONG_SHORT_DAYS = config.daysFormat || "short";
        this.LONG_SHORT_MONTH = config.monthFormat || "long";
        this.CURRENT_YEAR = this.DATE.getFullYear();
        this.CURRENT_MONTH = this.DATE.getMonth();
        this.CURRENT_DAY_WEEK = this.DATE.getDay();
        this.CURRENT_DATE = this.DATE.getDate();

        this.SELECTED_DATES = [];

        this.AVAILABLE_DATES = [];
        this.UNAVAILABLE_DATES = ['2025-03-20', '2025-03-21', '2025-03-22'];
        this.BOOKED_DATES = ['2025-03-25', '2025-03-26', '2025-03-27'];

        this.IS_SINGLE_SELECT = config.isSingleSelect || false;
        this.MIN_MAX_SELECT = this.getMinMaxConfig()
        this.MIN_SELECT = this.MIN_MAX_SELECT.min;
        this.MAX_SELECT = this.MIN_MAX_SELECT.max;

        this.startDate = null;
        this.endDate = null;
    }

    getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }

    calculateCalendarCells(year, month) {
        let prevMonthDays = this.getDaysInMonth(year, month - 1);
        let currentMonthDays = this.getDaysInMonth(year, month);
        let nextMonthDays = this.getDaysInMonth(year, month + 1);

        let currentMonthFirstDayindex = this.getFirstDayOfMonth(year, month);
        let prevMonthDayCells = currentMonthFirstDayindex;
        let nextMonthDayCells = this.CALENDAR_BOXES - (prevMonthDayCells + currentMonthDays);

        return {
            prevMonthDays,
            currentMonthDays,
            nextMonthDays,
            currentMonthFirstDayindex,
            prevMonthDayCells,
            nextMonthDayCells,
        };
    }

    generateCalendarCells(prevMonthDays, prevMonthDayCells, currentMonthDays, nextMonthDayCells) {
        const calendarCells = [];

        const addCells = (start, end, type) => {
            for (let i = start; i <= end; i++) {
                calendarCells.push({
                    day: String(i).padStart(2, "0"),
                    type
                });
            }
        };

        // Add previous month days
        addCells(prevMonthDays - prevMonthDayCells + 1, prevMonthDays, "previous");

        // Add current month days
        addCells(1, currentMonthDays, "curr");

        // Add next month days
        addCells(1, nextMonthDayCells, "next");

        return calendarCells;
    }

    getDateRange(startDate, endDate) {
        let dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            let formattedDate = currentDate.toISOString().split('T')[0];
            dates.push(formattedDate);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }

    handleDateSelection(clickedDate, clickedMonth, clickedYear, ui) {
        const selectedDate = new Date(clickedYear, clickedMonth, clickedDate);
        const formattedDate = selectedDate.toISOString().split('T')[0];

        if (this.IS_SINGLE_SELECT) {
            // Single selection logic
            if (this.SELECTED_DATES.includes(formattedDate)) {
                // Deselect if already selected
                this.SELECTED_DATES = [];
                this.startDate = null;
                this.endDate = null;
                ui.clearSelections();
                return { action: "reset-selection" };
            } else {
                // Select new date
                this.SELECTED_DATES = [formattedDate];
                this.startDate = selectedDate;
                this.endDate = null;
                ui.clearSelections();
                return { action: "first-selection" };
            }
        } else {
            // Multi-selection logic with range
            if (!this.startDate) {
                // First click: Set startDate
                this.startDate = selectedDate;
                this.endDate = null;
                ui.clearSelections();
                this.SELECTED_DATES = [formattedDate];
                return { action: "first-selection" };
            } else if (!this.endDate) {
                // Second click: Set endDate and select range
                this.endDate = selectedDate;

                if (this.endDate < this.startDate) {
                    // Swap dates if endDate is before startDate
                    [this.startDate, this.endDate] = [this.endDate, this.startDate];
                }

                this.SELECTED_DATES = this.getDateRange(this.startDate, this.endDate);

                if (this.SELECTED_DATES.length < this.MIN_SELECT) {
                    // Ensure at least MIN_SELECT dates are selected
                    this.startDate = null;
                    this.endDate = null;
                    this.SELECTED_DATES = [];
                    ui.clearSelections();
                    if (ui.IS_CUSTOM_MODAL) {
                        ui.showModal(`You must select at least ${this.MIN_SELECT} dates.`, "error");
                    }
                    return { action: "min-select-limit", minRequired: this.MIN_SELECT };
                }

                if (this.MAX_SELECT !== -1 && this.SELECTED_DATES.length > this.MAX_SELECT) {
                    // Prevent selection beyond MAX_SELECT limit
                    this.startDate = null;
                    this.endDate = null;
                    this.SELECTED_DATES = [];
                    ui.clearSelections();

                    if (!ui.IS_CUSTOM_MODAL) {
                        ui.showModal(`Maximum selection limit is ${this.MAX_SELECT} dates.`, "error");
                    }
                    return { action: "max-select-limit", maxAllowed: this.MAX_SELECT };
                }

                return { action: "range-selection", dates: this.SELECTED_DATES };
            } else {
                // Third click: Reset and start new selection
                this.startDate = selectedDate;
                this.endDate = null;
                ui.clearSelections();
                this.SELECTED_DATES = [formattedDate];
                return { action: "first-selection" };
            }
        }
    }

    getLanguage() {
        return this.LANGUAGE;
    }

    setLanguage(language) {
        this.LANGUAGE = language || "en";
    }

    getCurrentDate() {
        return {
            year: this.CURRENT_YEAR,
            month: this.CURRENT_MONTH,
            date: this.CURRENT_DATE,
            dayWeek: this.CURRENT_DAY_WEEK
        };
    }

    getFormatSettings() {
        return {
            daysFormat: this.LONG_SHORT_DAYS,
            monthFormat: this.LONG_SHORT_MONTH
        };
    }

    getMinMaxConfig() {
        try {
            const minMaxOptions = this.CONFIG?.minMaxSelect ? JSON.parse(this.CONFIG.minMaxSelect) : {};
            return {
                min: Number(minMaxOptions.minSelect) || 2,
                max: Number(minMaxOptions.maxSelect) || 10,
            };
        } catch (error) {
            console.error("Invalid JSON in minMaxOptions attribute:", error);
            return { min: 2, max: 10 };
        }
    }
}

// CalendarCommunication class - handles all calendar communication with widget
class CalendarCommunication {
    constructor(host) {
        this.host = host;
    }

    sendEventHello(data) {
        this.host.dispatchEvent(new CustomEvent('hello', { detail: data }));
    }

    sendEventSelectedDates() {
        // logic here
    }
}

// Main CalendarWidget class - combines UI and Functionality
class CalendarWidget extends HTMLElement {
    constructor() {
        super();
        // Initialize shadow DOM
        this.shadow = this.attachShadow({ mode: "open" });

        // Configuration from attributes
        const config = {
            language: this.getAttribute("calendarLanguage"),
            timezone: this.getAttribute("calendarTimezone"),
            daysFormat: this.getAttribute("weekDaysFormat"),
            monthFormat: this.getAttribute("monthFormat"),
            isSingleSelect: this.getAttribute("isSingleSelect"),
            isCustomModalSelect:this.getAttribute("isCustomModalSelect"),
            minMaxSelect: this.getAttribute("selectMinMax"),
        };

        console.log("CalendarWidget::config::", config);
        this.fontConfig = this.getFontConfig()
        this.designConfig = this.getDesignConfig()
        // Initialize components
        this.functionality = new CalendarFunctionality(config);
        this.ui = new CalendarUI(this, this.shadow, this.fontConfig, this.designConfig);
        this.communication = new CalendarCommunication(this)
    }

    static get observedAttributes() {
        return ["calendarLanguage", "calendarTimezone", "isSingleSelect", "selectMinMax", "fontOptions", "colorOptions", "weekDaysFormat", "monthFormat","isCustomModalSelect"];
    }

    connectedCallback() {
        console.log("Calendar Widget Connected...");
        this.initializeCalendar();
        this.setupEventListeners();
        this.communication.sendEventHello("HEY...FROM COMMUNICATION::SEND EVENT")
    }

    disconnectedCallback() {
        // Clean up event listeners if needed
        console.log("Calendar Widget Disconnected...");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(
            `attributeChangedCallback::Attribute ${name} has changed from ${oldValue} to ${newValue}.`
        );

        switch (name) {
        case "calendarLanguage":
            this.functionality.setLanguage(newValue);
            this.refreshCalendar();
            break;
        case "weekDaysFormat":
            this.functionality.LONG_SHORT_DAYS = newValue || "short";
            this.refreshCalendar();
            break;
        case "monthFormat":
            this.functionality.LONG_SHORT_MONTH = newValue || "long";
            this.refreshCalendar();
            break;
        case "fontOptions":
            this.ui.fontConfig = newValue
            console.log("ATTRIBUTE CHNAGED::fontOptions::", newValue);
            this.ui.loadStyles()
            this.refreshCalendar()
            break;
        case "isCustomModalSelect":
            this.ui.IS_CUSTOM_MODAL = newValue
            console.log("ATTRIBUTE CHNAGED::isCustomModalSelect::", newValue);
            break;
        case "colorOptions":
            this.ui.designConfig = newValue
            this.ui.loadStyles()
            this.refreshCalendar()
            break;
        case "isSingleSelect":
            this.functionality.IS_SINGLE_SELECT = newValue || true
            console.log("ATTRIBUTE CHNAGED::isSingleSelect::", newValue);
            this.refreshCalendar()
            break
        case "selectMinMax":
            this.functionality.MIN_MAX_SELECT = newValue || true
            this.refreshCalendar()
            break
        default:
            break;
        }
    }

    initializeCalendar() {
        const { year, month, date } = this.functionality.getCurrentDate();
        const { daysFormat, monthFormat } = this.functionality.getFormatSettings();
        const language = this.functionality.getLanguage();

        // Initialize UI components
        this.ui.renderCalendarWeekDays(language, daysFormat);
        this.ui.renderCalendarCurrentMonthYearDate(date, year, month, language, monthFormat);
        this.renderCalendar(year, month);
    }

    refreshCalendar() {
        const { year, month, date } = this.functionality.getCurrentDate();
        const { daysFormat, monthFormat } = this.functionality.getFormatSettings();
        const language = this.functionality.getLanguage();

        this.ui.renderCalendarWeekDays(language, daysFormat);
        this.ui.renderCalendarCurrentMonthYearDate(date, year, month, language, monthFormat);
        this.renderCalendar(year, month);
    }

    renderCalendar(year, month) {
        const language = this.functionality.getLanguage();
        const { monthFormat } = this.functionality.getFormatSettings();

        const calculatedCells = this.functionality.calculateCalendarCells(year, month);
        const generatedCells = this.functionality.generateCalendarCells(
            calculatedCells.prevMonthDays,
            calculatedCells.prevMonthDayCells,
            calculatedCells.currentMonthDays,
            calculatedCells.nextMonthDayCells
        );

        this.ui.renderCalendarDays(generatedCells);
        this.ui.setNextPrevBtnClickedData(year, month, language, monthFormat);

        // Mark dates as available, unavailable, or booked
        this.markDateAvailability(year, month);

        // Reapply selected dates if any exist
        if (this.functionality.SELECTED_DATES.length > 0) {
            this.ui.animateSelection(this.functionality.SELECTED_DATES, month, year, this.functionality.BOOKED_DATES, this.functionality.UNAVAILABLE_DATES);
        }
    }

    markDateAvailability(year, month) {
        const currentDayCells = this.shadow.querySelectorAll(".ce__calendar__bottom__date__curr");
        const unavailableDates = this.functionality.UNAVAILABLE_DATES;
        const bookedDates = this.functionality.BOOKED_DATES;

        currentDayCells.forEach(dayCell => {
            const dayNum = parseInt(dayCell.textContent);
            const currentDate = new Date(year, month, dayNum);
            const formattedDate = currentDate.toISOString().split('T')[0];

            // Remove any existing status classes
            dayCell.classList.remove('available', 'unavailable', 'booked');

            // Check if date is unavailable
            if (unavailableDates.includes(formattedDate)) {
                dayCell.classList.add('unavailable');
                dayCell.style.cursor = 'not-allowed';
            }
            // Check if date is booked
            else if (bookedDates.includes(formattedDate)) {
                dayCell.classList.add('booked');
                dayCell.style.cursor = 'not-allowed';
            }
            // Otherwise, date is available
            else {
                dayCell.classList.add('available');
                dayCell.style.cursor = 'pointer';
            }
        });
    }

    setupEventListeners() {
        // Get navigation buttons
        const { nextBtn, prevBtn } = this.ui.getNavigationButtons();
        const dateContainer = this.ui.getDateContainer();

        // Navigation event listeners
        nextBtn.addEventListener("click", () => this.handleMonthNavigation(1));
        prevBtn.addEventListener("click", () => this.handleMonthNavigation(-1));

        // Date selection event listener
        dateContainer.addEventListener("click", (event) => {
            if (event.target.tagName === "P" && event.target.classList.contains("ce__calendar__bottom__date__curr")) {
                this.handleDateClick(event.target);
            }
        });
    }

    handleMonthNavigation(direction) {
        const { yearElem, monthElem } = this.ui.getMonthYearElements();
        let year = parseInt(yearElem.textContent);
        let month = parseInt(monthElem.value);

        month += direction;

        if (month > 11) {
            month = 0;
            year++;
        } else if (month < 0) {
            month = 11;
            year--;
        }

        // Update current year and month in functionality
        this.functionality.CURRENT_YEAR = year;
        this.functionality.CURRENT_MONTH = month;

        // Re-render the calendar
        this.renderCalendar(year, month);
    }

    handleDateClick(clickedDayElement) {
        // Only allow selection of available dates
        if (!clickedDayElement.classList.contains('available')) {
            return;
        }

        const clickedDate = parseInt(clickedDayElement.textContent);
        const { yearElem, monthElem } = this.ui.getMonthYearElements();
        const clickedYear = parseInt(yearElem.textContent);
        const clickedMonth = parseInt(monthElem.value);

        const result = this.functionality.handleDateSelection(
            clickedDate,
            clickedMonth,
            clickedYear,
            this.ui
        );

        // Apply selected class to clicked element
        if (result.action === "first-selection") {
            clickedDayElement.classList.add("selected");
        } else if (result.action === "range-selection") {
            // For range selection, update the UI to show all selected dates
            this.ui.animateSelection(result.dates, clickedMonth, clickedYear, this.functionality.BOOKED_DATES, this.functionality.UNAVAILABLE_DATES);
        }

        // Dispatch custom event with selection information
        this.dispatchEvent(new CustomEvent('dateSelected', {
            detail: {
                action: result.action,
                selectedDates: this.functionality.SELECTED_DATES,
                startDate: this.functionality.startDate,
                endDate: this.functionality.endDate
            }
        }));
    }

    getFontConfig() {
        try {
            return this.getAttribute("fontOptions") ?
                JSON.parse(this.getAttribute("fontOptions")) : {
                    fontFamily: "monospace, sans-serif",
                    fontSize: "16",
                    fontSizeType: "px",
                    fontStyle: "normal",
                    fontWeight: "normal"
                };
        } catch (error) {
            console.error("Invalid font configuration:", error);
            return {
                fontFamily: "monospace, sans-serif",
                fontSize: "16",
                fontSizeType: "px",
                fontStyle: "normal",
                fontWeight: "normal"
            };
        }
    }

    getDesignConfig() {
        try {
            return this.getAttribute("colorOptions") ?
                JSON.parse(this.getAttribute("colorOptions")) : {
                    colorBackground: "white",
                    bgColorPrevNextBox: "#f5f5f5",
                    textColorPrevNextBox: "#999999",
                    colorAvailableBox: "white",
                    colorAvailableBoxFont: "black",
                    colorUnavailableBox: "white",
                    colorUnavailableBoxFont: "black",
                    colorBookedBox: "white",
                    colorBookedBoxFont: "black",
                    colorSelectedBox: "rgb(245, 93, 59)",
                    colorSelectedBoxFont: "white",
                    colorAccent: "rgb(245, 93, 59)"
                };
        } catch (error) {
            console.error("Invalid design configuration:", error);
            return {
                colorBackground: "white",
                bgColorPrevNextBox: "#f5f5f5",
                textColorPrevNextBox: "#999999",
                colorAvailableBox: "white",
                colorAvailableBoxFont: "black",
                colorUnavailableBox: "white",
                colorUnavailableBoxFont: "black",
                colorBookedBox: "white",
                colorBookedBoxFont: "black",
                colorSelectedBox: "rgb(245, 93, 59)",
                colorSelectedBoxFont: "white",
                colorAccent: "rgb(245, 93, 59)"
            };
        }
    }
}

// Register the custom element
customElements.define("calendar-widget", CalendarWidget);