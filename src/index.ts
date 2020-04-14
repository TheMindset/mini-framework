import { User } from './models/User'

const user = new User({name: 'Test', age: 12})

user.on('change', () => {
  console.log('Chang #1');  
})

user.on('save', () => {
  console.log('Hola quetal');
})


user.trigger('save')
