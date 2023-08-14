console.log("Tickets Page Loaded!");

document.addEventListener('alpine:init', () => {
    Alpine.data('tickets', () => ({
        date: null,
        open:false,
        name:'',
        totalPayable:'',
        ticketTypes: [
            {
                name: 'Sri Lankan Adult',
                peak: 6,
                offPeak: 4,
                count: 0,
                total: 0,
                individualTotal: 0  // New property to store individual total for each ticket
            },
            {
                name: 'Sri Lankan Child',
                peak: 3,
                offPeak: 2,
                count: 0,
                total: 0,
                individualTotal: 0
            },
            {
                name: 'Foreign Adult',
                peak: 13,
                offPeak: 10,
                count: 0,
                total: 0,
                individualTotal: 0
            },
            {
                name: 'Foreign Child',
                peak: 8,
                offPeak: 5,
                count: 0,
                total: 0,
                individualTotal: 0
            },
            {
                name: 'Infant',
                peak: 0,
                offPeak: 0,
                count: 0,
                total: 0,
                individualTotal: 0
            },
        ],
        openTimes: [
            { 
                title: '7AM to 8AM',
                isPeak: false
            },
            {
                title: '8AM to 9AM',
                isPeak: false
            },
            {
                title: '9AM to 10AM',
                isPeak: false
            },
            {
                title: '10AM to 11AM(Peak hour)',
                isPeak: true
            },
            {
                title: '11AM to 12PM(Peak hour)',
                isPeak: true
            },
            {
                title: '12PM to 1PM(Peak hour)',
                isPeak: true
            },
            {
                title: '1PM to 2PM',
                isPeak: false
            },
            {
                title: '2PM to 3PM',
                isPeak: false
            },
            {
                title: '3PM to 4PM(Peak hour)',
                isPeak: true
            },
            {
                title: '4PM to 5PM(Peak hour)',
                isPeak: true
            },
            {
                title: '5PM to 6PM(Peak hour)',
                isPeak: true
            },
            // ... (time slots)
        ],

        selectedTimeSlots: [],

        showTimes: false,

        selectTimeSlot(index) {
            if (this.selectedTimeSlots.includes(index)) {
                alert('Time slot already chosen.');
            } else {
                this.selectedTimeSlots.push(index);
                this.totalCalc();
            }
        },

        calculate(ticketType) {
            let total = 0;
            this.selectedTimeSlots.forEach((timeSlotIndex) => {
                const timeSlot = this.openTimes[timeSlotIndex];
                total += parseInt(ticketType.count * (timeSlot.isPeak ? ticketType.peak : ticketType.offPeak));
            });
            ticketType.total = total;
            this.totalCalc();
        },

        totalCalc(ticketTypes) {
            this.totalPayable = 0;
            for (const ticketType of this.ticketTypes) {
                ticketType.individualTotal = ticketType.total;  // Calculate individual total for each ticket
                this.totalPayable += ticketType.total;
            }
            return this.totalPayable;
        },
        

        gotoCheckout() {
            
            

            localStorage.setItem('SavedDate', JSON.stringify(this.date));
            localStorage.setItem('SavedTimeslot', JSON.stringify(this.selectedTimeSlots));
            localStorage.setItem('SavedPrice', JSON.stringify(this.ticketTypes));
            localStorage.setItem('TotalPayable', JSON.stringify(this.totalPayable));
            localStorage.setItem('TotalDuration', JSON.stringify(this.selectTimeSlot.length));


            window.location.href = 'Details.html';
        }
    }));
});
document.addEventListener('alpine:init', () => {
    Alpine.data('checkout', () => ({
       SavedDate: null,
       SavedName: '',
       SavedTimeslot:[],
       SavedPrice:'',
       TotalPayable:'',
       openTimes: [
           {
               title: '7AM to 8AM',
               isPeak: false
           },
           {
               title: '8AM to 9AM',
               isPeak: false
           },
           {
               title: '9AM to 10AM',
               isPeak: false
           },
           {
               title: '10AM to 11AM(Peak hour)',
               isPeak: true
           },
           {
               title: '11AM to 12PM(Peak hour)',
               isPeak: true
           },
           {
               title: '12PM to 1PM(Peak hour)',
               isPeak: true
           },
           {
               title: '1PM to 2PM',
               isPeak: false
           },
           {
               title: '2PM to 3PM',
               isPeak: false
           },
           {
               title: '3PM to 4PM(Peak hour)',
               isPeak: true
           },
           {
               title: '4PM to 5PM(Peak hour)',
               isPeak: true
           },
           {
               title: '5PM to 6PM(Peak hour)',
               isPeak: true
           },
       ],
       guest: {
            fullName: '',
            mobile: '',
            email: '',
            gender: ''
        },
        isFormValid() {
            return (
                this.guest.fullName &&
                this.guest.mobile &&
                this.guest.email &&
                this.isValidEmail(this.guest.email) &&
                this.guest.confirmEmail &&
                this.guest.email === this.guest.confirmEmail &&
                this.guest.gender
            );
            
        },
       goToPayment() {
          // set the guest data to local storage
        localStorage.setItem('guestName', JSON.stringify(this.guest.fullName));
        localStorage.setItem('guestMobile', JSON.stringify(this.guest.mobile));
        localStorage.setItem('guestEmail', JSON.stringify(this.guest.email));
        localStorage.setItem('guestGender', JSON.stringify(this.guest.gender));

            // redirect to payment page
            window.location.href = 'payments.html'
        },
        
        init() {
           this.SavedDate = JSON.parse(localStorage.getItem('SavedDate'));
           this.SavedName = JSON.parse(localStorage.getItem('guestName'));
           this.SavedMobile = JSON.parse(localStorage.getItem('guestMobile'));
           this.SavedTimeslot = JSON.parse(localStorage.getItem('SavedTimeslot'));
           this.SavedPrice = JSON.parse(localStorage.getItem('SavedPrice'));
           this.TotalPayable = JSON.parse(localStorage.getItem('TotalPayable'));
           this.TotalDuration = JSON.parse(localStorage.getItem('TotalDuration'));
           this.SavedEmail = JSON.parse(localStorage.getItem('guestEmail'));
           this.SavedGender = JSON.parse(localStorage.getItem('guestGender'));


            const input = document.querySelector("#mobile");
            window.intlTelInput(input, {
                utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
            });
        },
        
       
    }));
});
