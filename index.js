const FormValidator = {
    config: {
        firstLastNameLength: 7,
        passwordLength: 8,
        passwordCharacters: '&',
        passwordUppercase: true, 
        passwordNumbers: true,
        emailLength: 13,
        emailCharacters: '@',
        emailDomainNameAllowed: {
            gmail: 'gmail',
            yahoo: 'yahoo',
            hotmail: 'hotmail',
            live: 'live',
            outlook: 'outlook',
        },
        usernameLength: 5,
        usernameDontAllowed: '-',
    },
    getInputValues: function(){
        const fl_name =  document.getElementById('first-last-name').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const country = document.getElementById('country').value;
        const password = document.getElementById('password').value;
        const password_repeated = document.getElementById('password-repeated').value;
        let all_values = {};
    
        return all_values = {
            firstLastName: fl_name,
            username: username,
            email: email,
            country: country,
            password: password,
            passwordRepeated: password_repeated,
        };  
    },
    errorHandler: function(){
        const values = FormValidator.getInputValues();
        const msg = document.querySelector('.msg');
        let errors = [];

        switch (true){
            case values.password != values.passwordRepeated:
                msg.innerText = `Passwords not matching!`;
                errors.push('1');
                break;
            case values.country === 'Country':
                msg.innerText = `Please select your country!`;
                errors.push('1');
                break;
            case values.email.length < this.config.emailLength:
                msg.innerText = `Email must have min. ${this.config.emailLength} characters`;
                errors.push('1');
                break;
            case (!values.email.includes(this.config.emailCharacters)):
                msg.innerText = `Email must contain ${this.config.emailCharacters} character`;
                errors.push('1');
                break;
            case (!values.email.includes(this.config.emailDomainNameAllowed.gmail)):
                if(!values.email.includes(this.config.emailDomainNameAllowed.outlook)){
                    if(!values.email.includes(this.config.emailDomainNameAllowed.yahoo)){
                        if(!values.email.includes(this.config.emailDomainNameAllowed.live)){
                            if(!values.email.includes(this.config.emailDomainNameAllowed.hotmail)){
                                msg.innerText = `That email domain name is not allowed!`;
                                errors.push('1');
                            }
                        }
                    }
                }
                break;
            case values.firstLastName.length < this.config.firstLastNameLength:
                msg.innerText = `First and Last Name must have min. ${this.config.firstLastNameLength} characters`;
                errors.push('1');
                break;
            case values.username.length < this.config.usernameLength:
                msg.innerText = `Username must have min. ${this.config.usernameLength} characters`;
                errors.push('1');
                break;
            case (values.username.includes(this.config.usernameDontAllowed)):
                msg.innerText = `Username can't contain ${this.config.usernameDontAllowed} character`;
                errors.push('1');
                break;
            case values.password.length < this.config.passwordLength:
                msg.innerText = `Password must have min. ${this.config.passwordLength} characters`;
                errors.push('1');
                break;
            case (!values.password.includes(this.config.passwordCharacters)):
                msg.innerText = `Password must contain ${this.config.passwordCharacters} character`;
                errors.push('1');
                break;
            case this.config.passwordUppercase === true:
                let upper = 0;
                for(let i = 0; i<values.password.length; i++){
                    if(values.password[i] === values.password[i].toUpperCase()){
                        if(values.password[i] != this.config.passwordCharacters){
                            upper++;
                        }
                    }
                }
                if(upper<1){
                    errors.push('1');
                    msg.innerText = `Password must contain min. 1 upper case character`;
                }
                break;
            case this.config.passwordNumbers === true:
                let numbers = 0;
                for (let i =0; i<values.password.length; i++){
                    if(typeof(values.password[i]) === 'number'){
                        numbers++;
                    }
                }
                if(numbers<1){
                    errors.push('1');
                    msg.innerText = `Password must contain min. 1 number`;
                }
                break;
        }

        return errors;
    },
    validateInputs: function(){
        const errors = FormValidator.errorHandler();
        const success = document.getElementById('success');
        const msg = document.querySelector('.msg');
        if(!errors.length){
            success.innerText = 'You are successfully registrated!';
            msg.innerText = '';
        }
    },
    init: function(){
        const submit_btn = document.getElementById('submit-btn');
        submit_btn.addEventListener('click', () => {
            FormValidator.validateInputs();
        });
    }
}

FormValidator.init();