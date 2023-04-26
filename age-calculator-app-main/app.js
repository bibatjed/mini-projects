function calculateAge(date){
    let days;
    let months;
    let years;



    const timeSinceBirth = new Date(date).getTime();
    const currentTime = new Date().getTime();
    
    const ageInTime = currentTime  - timeSinceBirth;
    const oneDay = 24 * 60 * 60 * 1000;

    years = Math.floor(ageInTime / (oneDay * 365));
  let remainingDays = Math.floor(ageInTime % (oneDay * 365));
  
  months = Math.floor(remainingDays / (oneDay * 30));

  days = Math.floor((remainingDays % (oneDay * 30)) / oneDay);

  
  return {
    "years": years,
    "months": months,
    "days":days
  }


}


function validateInput(){
     const dateErrorDiv = document.getElementById('date-error');
     const dayErrorDiv = document.getElementById('day-error');
     const monthErrorDiv = document.getElementById('month-error');
     const yearErrorDiv = document.getElementById('year-error');

    

     const yearInput = document.getElementById('year-input');
     const dayInput = document.getElementById('day-input');
     const monthInput = document.getElementById('month-input');
     


    const missingElementMessage = "This field is required";
    const hideElement = 'hide-element';
    let day;
    let month;
    let year;

    if(dayInput.value){
        day = parseInt(dayInput.value);
    }else {
        dayErrorDiv.textContent = missingElementMessage;
        dayErrorDiv.classList.remove(hideElement);
        fadeOut(dayErrorDiv,hideElement);
        return;
        
    }

    if(monthInput.value){
        month = parseInt(monthInput.value);
    }else {
        monthErrorDiv.textContent = missingElementMessage;
        monthErrorDiv.classList.remove(hideElement);
        fadeOut(monthErrorDiv,hideElement);
        return;
        
    }

    if(yearInput.value){
        year = parseInt(yearInput.value);
    }else {
        yearErrorDiv.textContent = missingElementMessage;
        yearErrorDiv.classList.remove(hideElement); 
        fadeOut(yearErrorDiv,hideElement);
        return;
    }

    if(day > 31){
        dayErrorDiv.classList.add(hideElement);
        dayErrorDiv.textContent = 'Must be a valid day';
        fadeOut(dayErrorDiv,hideElement);
        return;
    }

   
    if(month > 12){

        monthErrorDiv.classList.remove(hideElement);
        monthErrorDiv.textContent = 'Must be a valid month';
        fadeOut(monthErrorDiv,hideElement);
        return;
    }

    const currentYear = new Date().getFullYear();
   
    if(year > currentYear){
        yearErrorDiv.classList.remove(hideElement);
        yearErrorDiv.textContent = 'Must be in the past';
        fadeOut(yearErrorDiv,hideElement);
        return;
    }
    
    const dateOfBirth = `${month}/${day}/${year}`;

    DAYS_IN_MONTH = [
        00,
        31,
        28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31];

    const checkInvalid = new Date(dateOfBirth).toString();
    if(checkInvalid === 'Invalid Date' || day !== DAYS_IN_MONTH[month]){
        dateErrorDiv.classList.remove(hideElement);
        dateErrorDiv.textContent = 'Must be a valid date';
        fadeOut(dateErrorDiv,hideElement);
        return;
    }

    return dateOfBirth;

}

function fadeOut(element,classname){
    setTimeout(()=> {
        element.classList.add(classname);
    },1000);

}




const submitBtn = document.querySelector('.btn');

submitBtn.addEventListener('click',()=> {
    const yearsResult = document.getElementById('years-result');
    const monthsResult = document.getElementById('months-result');
    const daysResult = document.getElementById('days-result');

     const age = calculateAge(validateInput());
     console.log(age);

     if(age.years){
     yearsResult.textContent = age.years;

     }

     if(age.months){
        monthsResult.textContent = age.months;

     }

     if(age.days){
        daysResult.textContent = age.days;
     }
     
     
   

})

