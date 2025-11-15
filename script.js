// Simple country -> states -> cities data
const geo = {
  IN: { code: '+91', states: { MH: ['Mumbai','Pune'], DL: ['New Delhi'] }},
  US: { code: '+1', states: { CA: ['Los Angeles','San Francisco'], NY: ['New York'] }},
  GB: { code: '+44', states: { ENG: ['London','Manchester'] }},
  AU: { code: '+61', states: { NSW: ['Sydney'], VIC: ['Melbourne'] }},
};

const disposableDomains = ['tempmail.com','mailinator.com','10minutemail.com'];

const form = document.getElementById('regForm');
const submitBtn = document.getElementById('submitBtn');
const alerts = document.getElementById('alerts');
const topErrors = document.getElementById('topErrors');

const fields = {
  firstName: document.getElementById('firstName'),
  lastName: document.getElementById('lastName'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  gender: () => document.querySelector('input[name="gender"]:checked'),
  country: document.getElementById('country'),
  state: document.getElementById('state'),
  city: document.getElementById('city'),
  password: document.getElementById('password'),
  confirmPassword: document.getElementById('confirmPassword'),
  terms: document.getElementById('terms')
};

function setError(name, message){
  const el = document.querySelector(`.error[data-for="${name}"]`);
  if(el) el.textContent = message || '';
  const input = document.getElementById(name);
  if(input){
    if(message) input.classList.add('invalid'); else input.classList.remove('invalid');
  }
}

function validateEmail(value){
  if(!value) return 'Email is required';
  try{ const d = value.split('@')[1].toLowerCase(); if(disposableDomains.includes(d)) return 'Disposable email not allowed'; }
  catch(e){}
  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return re.test(value) ? '' : 'Invalid email';
}

function validatePhone(value){
  if(!value) return 'Phone is required';
  const country = fields.country.value;
  if(country && geo[country]){
    if(!value.startsWith(geo[country].code)) return `Phone must start with ${geo[country].code}`;
  }
  const digits = value.replace(/[^0-9]/g,'');
  return digits.length < 6 ? 'Invalid phone number' : '';
}

function pwdStrength(pwd){
  let score=0; if(pwd.length>=8) score++; if(/[A-Z]/.test(pwd)) score++; if(/[0-9]/.test(pwd)) score++; if(/[^A-Za-z0-9]/.test(pwd)) score++;
  if(score<=1) return 'Weak'; if(score===2) return 'Medium'; return 'Strong';
}

function validateAll(){
  topErrors.textContent = '';
  let valid=true;

  // First & Last
  if(!fields.firstName.value.trim()){ setError('firstName','First name required'); valid=false } else setError('firstName','');
  if(!fields.lastName.value.trim()){ setError('lastName','Last name required'); valid=false } else setError('lastName','');

  // Email
  const e = validateEmail(fields.email.value.trim()); if(e){ setError('email',e); valid=false } else setError('email','');
  // Phone
  const p = validatePhone(fields.phone.value.trim()); if(p){ setError('phone',p); valid=false } else setError('phone','');

  // Gender
  if(!fields.gender()) { setError('gender','Select gender'); valid=false } else setError('gender','');

  // Country
  if(!fields.country.value){ setError('country','Select country'); valid=false } else setError('country','');

  // Passwords
  const pw = fields.password.value || '';
  if(!pw) { setError('password','Password required'); valid=false } else setError('password','');
  if(fields.confirmPassword.value !== pw){ setError('confirmPassword','Passwords do not match'); valid=false } else setError('confirmPassword','');

  // Terms
  if(!fields.terms.checked){ setError('terms','You must accept terms'); valid=false } else setError('terms','');

  submitBtn.disabled = !valid;
  return valid;
}

// Wire up events
form.addEventListener('input', ()=>{ validateAll(); updatePwdMeter(); });
form.addEventListener('change', ()=>{ validateAll(); });

function updatePwdMeter(){ const s = pwdStrength(fields.password.value||''); document.getElementById('pwdStrength').textContent = s; }

// Populate states/cities
fields.country.addEventListener('change', ()=>{
  const country = fields.country.value;
  const stateEl = fields.state; stateEl.innerHTML = '<option value="">Select state</option>';
  const cityEl = fields.city; cityEl.innerHTML = '<option value="">Select city</option>';
  if(country && geo[country]){
    Object.keys(geo[country].states).forEach(k=>{
      const opt = document.createElement('option'); opt.value = k; opt.textContent = k; stateEl.appendChild(opt);
    });
  }
  validateAll();
});

fields.state.addEventListener('change', ()=>{
  const country = fields.country.value;
  const state = fields.state.value;
  const cityEl = fields.city; cityEl.innerHTML = '<option value="">Select city</option>';
  if(country && geo[country] && geo[country].states[state]){
    geo[country].states[state].forEach(c=>{
      const opt = document.createElement('option'); opt.value = c; opt.textContent = c; cityEl.appendChild(opt);
    });
  }
  validateAll();
});

// Submit handler; simulate backend with setTimeout
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  if(!validateAll()){
    topErrors.textContent = 'Please fix the errors below.'; alerts.innerHTML = '<div class="err">❌ Please fix errors and try again</div>'; return;
  }
  submitBtn.disabled = true; alerts.innerHTML = '';

  // Simulate network
  setTimeout(()=>{
    alerts.innerHTML = '<div class="ok">✅ Registration Successful! Your profile has been submitted successfully.</div>';
    form.reset(); document.getElementById('pwdStrength').textContent='-'

    // Clear errors
    Object.keys(fields).forEach(k=>setError(k,''));
    submitBtn.disabled = false;
  }, 1500);
});

// Initial validation
validateAll();