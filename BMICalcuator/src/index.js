function calculateBmi(weight,height){
    let heightInMeters = height/100;
    let squareHeight = heightInMeters * heightInMeters;

    let bmi = weight / squareHeight;

    return bmi.toFixed(2);
}


function bmiMessage(bmi){
    let message = '';
    if(bmi < 18.5){
        message = "Underweight";
    }else if(bmi >= 18.5 && bmi <= 24.9){
        message = "Normal";
    }else if(bmi >= 25 && bmi <= 29.9){
        message = "Overweight";
    }else if(bmi >= 30){
        message = "Obese";
    }

    return message;
}

function displayProfile(height,weight){
    const profile = document.createElement('div');
    profile.classList.add("profile");

    const heightDiv  = document.createElement("div");
    heightDiv.classList.add("height-profile");

    let heightHtml = `
    <h3>HEIGHT</h3>
    <h5>${height}CM</h5>
    `;
    heightDiv.innerHTML = heightHtml;
    profile.appendChild(heightDiv);

    const weightDiv  = document.createElement("div");
    

    let weightHtml = `
    <h3>WEIGHT</h3>
    <h5>${weight}CM</h5>
    `;
    weightDiv.innerHTML = weightHtml;
    profile.appendChild(weightDiv);

    

    return profile;
}

function displayBMI(message,bmi){
    let bmiDiv = document.createElement("div");
    bmiDiv.classList.add("bmi");

    const messageH = document.createElement("h3");
    messageH.innerHTML = message.toUpperCase();

    if(message === "underweight"){
        messageH.style.color = "red";
    }else if(message === "normal"){
        messageH.style.color = "green";
    }else if(message === "overweight"){
        messageH.style.color = "yellow"
    }else if(message === "obese"){
        messageH.style.color = "red";
    }

    bmiDiv.appendChild(messageH);

    const valueH = document.createElement("h2");
    valueH.innerHTML = bmi;

    bmiDiv.appendChild(valueH);

    return bmiDiv;
}

function bmiAdvice(message){
    const adviceList = document.createElement("ul");

    const underWeightAdvice = [
        "<b>Increase calorie intake:</b> Consuming more calories than they burn is key to gaining weight. Try to consume an additional 500 calories per day.",
        "<b>Focus on nutrient-dense foods:</b> Choose foods that are high in nutrients such as lean proteins, healthy fats, complex carbohydrates, and whole grains.",
        "<b>Snack frequently:</b> Eating small, frequent meals throughout the day can help increase calorie intake without overwhelming your appetite.",
        "<b>Exercise:</b> Regular physical activity can help build muscle mass and increase appetite."
        
    ];

    const normalWeightAdvice = [
        "<b>Maintain a balanced diet:</b> Consume a variety of foods that provide all necessary nutrients in the right proportions.",
        "<b>Portion control:</b> Eating too much of any type of food can cause weight gain, so it's important to watch portion sizes.",
        "<b>Hydration:</b> Drinking plenty of water helps maintain proper body function and aids in weight management.",
        "<b>Exercise:</b> Engage in regular physical activity to maintain a healthy weight and overall wellbeing."
    ];

    const overWeightAdvice = [
        "<b>Portion control:</b> Eat smaller portions to help reduce overall calorie intake.",
        "<b>Choose healthy foods:</b> Focus on nutrient-dense foods such as fruits, vegetables, lean proteins, and whole grains.",
        "<b>Avoid high-calorie drinks:</b> Limit or eliminate sugary drinks and instead opt for water or unsweetened beverages.",
        "<b>Exercise:</b> Regular physical activity can help increase metabolism and burn calories."
    ];

    const obeseAdvice = [
        "<b>Seek medical advice:</b> Obesity is a serious medical condition that may require medical intervention.",
        "<b>Balance diet:</b> Consume a variety of foods that provide all necessary nutrients, in appropriate portions.",
        "<b>Reduce calorie intake:</b> Aim to create a calorie deficit through a combination of reducing portion sizes, eating healthier foods, and increasing physical activity.",
        "<b>Increase physical activity:</b> Engage in regular physical activity to help burn calories, improve overall fitness, and increase metabolism."
    ];

    if(message === "underweight"){
        for(let i = 0; i <= underWeightAdvice.length; i++){
           if(underWeightAdvice[i] !== undefined){
            const advice = document.createElement('li');
            advice.innerHTML = underWeightAdvice[i];
            adviceList.appendChild(advice);
           }
        }
    }

    if(message === "normal"){
        for(let i = 0; i <= normalWeightAdvice.length; i++){
           if(normalWeightAdvice[i] !== undefined){
            const advice = document.createElement('li');
            advice.innerHTML = normalWeightAdvice[i];
            adviceList.appendChild(advice);
           }
        }
    }

    if(message === "overweight"){
        for(let i = 0; i <= overWeightAdvice.length; i++){
           if(overWeightAdvice[i] !== undefined){
            const advice = document.createElement('li');
            advice.innerHTML = overWeightAdvice[i];
            adviceList.appendChild(advice);
           }
        }
    }

    if(message === "obese"){
        for(let i = 0; i <= obeseAdvice.length; i++){
           if(obeseAdvice[i] !== undefined){
            const advice = document.createElement('li');
            advice.innerHTML = obeseAdvice[i];
            adviceList.appendChild(advice);
           }
        }
    }




    const takeAway = document.createElement("div");
    takeAway.classList.add("take-away");

    const h4  = document.createElement("h4");
    h4.innerHTML = "Take Away";
    takeAway.appendChild(h4);
    takeAway.appendChild(adviceList);


    return takeAway;
}



window.addEventListener('load',() => {
    const height = document.querySelector("#height-input");
    const weightInput = document.querySelector("#weight-input");
    const ageInput = document.querySelector("#age-input");
    const calculateButton = document.querySelector(".calculate");
    const result = document.querySelector(".result");
    const container = document.querySelector(".container");
    const backButton = document.querySelector(".back");

    

    function displayResult(message,bmi){
        const bmiResult = displayBMI(message,bmi);
        const healthAdvice = bmiAdvice(message);
        result.appendChild(bmiResult);
        result.appendChild(healthAdvice);
        result.style.display = "block";
        container.style.display = "none";
    }


    calculateButton.addEventListener('click',() =>{

        if(!weightInput.value || !height.value){
            alert("Please enter missing values");
            return;
        }


        let bmi = calculateBmi(weightInput.value,height.value);
        let message = bmiMessage(bmi).toLowerCase();
        result.appendChild(displayProfile(height.value,weightInput.value));
        displayResult(message,bmi);
        result.appendChild(backButton);
        
        
    });

    backButton.addEventListener('click',()=>{
        result.innerHTML = '';
        result.style.display = "none";
        container.style.display = "block";
    });
    
});