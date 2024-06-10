const availableSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
];

const unsociableHoursFee = 10; // £10

const unavailableSlots = [
  "15:00", "15:30"
];

function isSlotAvailable(time) {
  return availableSlots.includes(time) && !unavailableSlots.includes(time);
}

function calculateServicePrice(serviceType) {
  return serviceType === "full_set" ? 55 : 20; // Full Set: £55, Infill: £20
}

function bookAppointment(date, time, serviceType) {
  if (!isSlotAvailable(time)) {
    alert("This time slot is not available.");
    return;
  }

  let totalAmount = calculateServicePrice(serviceType);
  if (parseInt(time) >= 20) {
    totalAmount += unsociableHoursFee;
  }

  const bookingDetails = {
    date: date,
    time: time,
    serviceType: serviceType,
    totalAmount: totalAmount
  };

  console.log("Booking Details:", bookingDetails);
  alert("Appointment booked successfully! Total amount: £" + totalAmount);
}

// Example usage:
// bookAppointment("2024-06-10", "09:00", "full_set");

document.addEventListener("DOMContentLoaded", function() {
  const calendarDiv = document.getElementById("calendar");
  availableSlots.forEach(slot => {
    const slotDiv = document.createElement("div");
    slotDiv.className = "slot";
    slotDiv.textContent = slot;
    if (!isSlotAvailable(slot)) {
      slotDiv.classList.add("booked");
    } else {
      slotDiv.addEventListener("click", function() {
        const time = this.textContent;
        const serviceType = confirm("Book full set?") ? "full_set" : "infill";
        bookAppointment("2024-06-10", time, serviceType);
      });
    }
    calendarDiv.appendChild(slotDiv);
  });
});
