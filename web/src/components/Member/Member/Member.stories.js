import Member from './Member'

const member = {
  name: 'Hoang Quoc An',
  birthdate: '1991/05/08',
  address: '289/2 Nguyen Thi Dinh, BTT, Tp Thu Duc, Tp HCM',
  email: 'hoangquocan91@gmail.com',
  phoneNumber: '0938949377',
  createdAt: '2022-07-27T20:00:00Z',
}
export const generated = () => {
  return <Member member={member} />
}

export default { title: 'Components/Member' }
