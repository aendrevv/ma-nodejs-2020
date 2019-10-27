const user = {  
  firstName: 'John', // string  
  lastName: 'Doe', // string  
  rate: 0.86, // number in range 0..1  
  address: { // not empty object or null    
    line1: '15 Macon St', // string    
    line2: '', // string    
    city: 'Gotham' // string  
  },  
  phoneNumbers: [ // array containing at least 1 element    
    {      
      type: 'MOBILE', // string, limited to MOBILE | LINE | VOIP      
      number: '(555) 555-1234' // string in specific format    
    },
    {
       type: 'LINE',      
       number: '(555) 555-5678'
    }
  ]
};

function check(obj) {
  if (typeof(obj.firstName) === 'string' && typeof(obj.lastName) === 'string') {
    if (obj.rate > 0 && obj.rate < 1) {
      if (typeof(obj.address.line1) === 'string' && typeof(obj.address.line2) === 'string' && typeof(obj.address.city) === 'string' ) {
        if (Array.isArray(obj.phoneNumbers)) { 
          for (i = 0; i < obj.phoneNumbers.length; i += 1) {
            if (obj.phoneNumbers[i].type !== 'MOBILE' && obj.phoneNumbers[i].type !== 'LINE' && obj.phoneNumbers[i].type !== 'VOIP') {
              return false;
            } else if (obj.phoneNumbers[i].number.substr(0,10) !== '(555) 555-') return false;
          } 
          return true;
        } 
      } 
    } 
  } 
}

console.log(check(user));
