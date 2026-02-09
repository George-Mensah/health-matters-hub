// BOOKING PROCESS LOGIC - UPDATED FOR NEW COLORS
document.addEventListener('DOMContentLoaded', function() {
  // Step 1: Visit Type Selection
  const visitTypeCards = document.querySelectorAll('.visit-type-card');
  const selectButtons = document.querySelectorAll('.btn-select');
  const selectedVisitType = document.getElementById('selectedVisitType');
  const summaryType = document.getElementById('summaryType');
  const confirmType = document.getElementById('confirmType');
  
  selectButtons.forEach(button => {
    button.addEventListener('click', function() {
      const visitType = this.getAttribute('data-visit');
      
      // Update selected card
      visitTypeCards.forEach(card => {
        card.classList.remove('selected');
        if (card.getAttribute('data-visit-type') === visitType) {
          card.classList.add('selected');
        }
      });
      
      // Update selected visit type display
      let visitName = '';
      switch(visitType) {
        case 'new-patient':
          visitName = 'New Patient Visit';
          break;
        case 'follow-up':
          visitName = 'Follow-Up Visit';
          break;
        case 'preventive':
          visitName = 'Preventive & Wellness Visit';
          break;
      }
      
      selectedVisitType.textContent = visitName;
      summaryType.textContent = visitName;
      confirmType.textContent = visitName;
      
      // Move to step 2
      document.getElementById('step-1').style.display = 'none';
      document.getElementById('step-2').style.display = 'block';
      
      // Update process indicator
      updateProcessIndicator(2);
    });
  });
  
  // Step 2: Date & Time Selection
  const timeSlots = document.querySelectorAll('.time-slot');
  const selectedAppointment = document.getElementById('selectedAppointment');
  const appointmentDate = document.getElementById('appointmentDate');
  const appointmentTime = document.getElementById('appointmentTime');
  const confirmTimeBtn = document.getElementById('confirmTime');
  const backToStep1Btn = document.getElementById('backToStep1');
  const selectedDate = document.getElementById('selectedDate');
  const summaryDate = document.getElementById('summaryDate');
  const summaryTime = document.getElementById('summaryTime');
  const confirmDate = document.getElementById('confirmDate');
  const confirmTime = document.getElementById('confirmTime');
  
  // Calendar navigation
  let currentDate = new Date();
  const currentMonth = document.getElementById('currentMonth');
  
  function updateCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    currentMonth.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
      const dayEl = document.createElement('div');
      dayEl.className = 'calendar-day-header';
      dayEl.textContent = day;
      calendarGrid.appendChild(dayEl);
    });
    
    // Add days
    const today = new Date();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // Empty cells for days before the first of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-day';
      calendarGrid.appendChild(emptyCell);
    }
    
    // Days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'calendar-day available';
      dayEl.textContent = i;
      
      const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      
      // Mark past days as unavailable
      if (cellDate < today) {
        dayEl.classList.remove('available');
        dayEl.classList.add('past');
      }
      
      // Mark today
      if (cellDate.toDateString() === today.toDateString()) {
        dayEl.classList.add('today');
      }
      
      // Add click event
      dayEl.addEventListener('click', function() {
        if (!this.classList.contains('past') && !this.classList.contains('unavailable')) {
          // Remove selected class from all days
          document.querySelectorAll('.calendar-day').forEach(day => {
            day.classList.remove('selected-day');
          });
          
          // Add selected class to clicked day
          this.classList.add('selected-day');
          
          // Update selected date display
          const selectedDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
          const dateString = selectedDateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          
          selectedDate.textContent = dateString;
          appointmentDate.textContent = dateString;
          summaryDate.textContent = dateString;
          confirmDate.textContent = dateString;
          
          // Show time slots
          selectedAppointment.style.display = 'block';
        }
      });
      
      calendarGrid.appendChild(dayEl);
    }
  }
  
  // Calendar navigation buttons
  document.getElementById('prevMonth').addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
  });
  
  document.getElementById('nextMonth').addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
  });
  
  // Time slot selection
  timeSlots.forEach(slot => {
    slot.addEventListener('click', function() {
      // Remove selected class from all time slots
      timeSlots.forEach(s => s.classList.remove('selected'));
      
      // Add selected class to clicked slot
      this.classList.add('selected');
      
      // Update selected time
      const time = this.textContent;
      appointmentTime.textContent = time;
      summaryTime.textContent = time + ' EST';
      confirmTime.textContent = time + ' EST';
    });
  });
  
  // Confirm time button
  confirmTimeBtn.addEventListener('click', function() {
    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'block';
    updateProcessIndicator(3);
  });
  
  // Back to step 1
  backToStep1Btn.addEventListener('click', function() {
    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-1').style.display = 'block';
    updateProcessIndicator(1);
  });
  
  // Step 3: Patient Information
  const backToStep2Btn = document.getElementById('backToStep2');
  const changeAppointmentBtn = document.getElementById('changeAppointment');
  const patientForm = document.getElementById('patientForm');
  const confirmEmail = document.getElementById('confirmEmail');
  
  // Back to step 2
  backToStep2Btn.addEventListener('click', function() {
    document.getElementById('step-3').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';
    updateProcessIndicator(2);
  });
  
  // Change appointment
  changeAppointmentBtn.addEventListener('click', function() {
    document.getElementById('step-3').style.display = 'none';
    document.getElementById('step-1').style.display = 'block';
    updateProcessIndicator(1);
  });
  
  // Form submission
  patientForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const firstName = document.getElementById('firstName').value;
    const email = document.getElementById('email').value;
    
    // Update confirmation email
    confirmEmail.textContent = email;
    
    // Show confirmation
    document.getElementById('step-3').style.display = 'none';
    document.getElementById('confirmation').style.display = 'block';
    updateProcessIndicator(4);
    
    // In a real implementation, you would send this data to your backend
    console.log('Form submitted:', {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      dob: document.getElementById('dob').value,
      reason: document.getElementById('reason').value,
      patientType: document.querySelector('input[name="patientType"]:checked').value,
      insurance: document.getElementById('insurance').value
    });
  });
  
  // Add to calendar button
  document.getElementById('addToCalendar').addEventListener('click', function() {
    alert('In a real implementation, this would add the appointment to your calendar. For now, please manually add it to your calendar.');
  });
  
  // Process indicator update
  function updateProcessIndicator(step) {
    document.querySelectorAll('.process-step').forEach((stepEl, index) => {
      if (index + 1 <= step) {
        stepEl.classList.add('active');
      } else {
        stepEl.classList.remove('active');
      }
    });
  }
  
  // Initialize calendar
  updateCalendar();
  updateProcessIndicator(1);
});