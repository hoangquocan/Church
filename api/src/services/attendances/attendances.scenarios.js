export const standard = defineScenario({
  attendance: {
    one: {
      data: {
        present: true,
        activity: {
          create: {
            name: 'String',
            date: '2022-08-12T11:28:13Z',
            group: { create: { name: 'String7758389', leader: 'String' } },
          },
        },

        member: {
          create: {
            name: 'String',
            birthDate: '2022-08-12T11:28:13Z',
            phoneNumber: 'String',
            email: 'String',
            address: 'String',
          },
        },
      },
    },

    two: {
      data: {
        present: true,
        activity: {
          create: {
            name: 'String',
            date: '2022-08-12T11:28:13Z',
            group: { create: { name: 'String609078', leader: 'String' } },
          },
        },

        member: {
          create: {
            name: 'String',
            birthDate: '2022-08-12T11:28:13Z',
            phoneNumber: 'String',
            email: 'String',
            address: 'String',
          },
        },
      },
    },
  },
})
