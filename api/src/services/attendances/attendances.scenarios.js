export const standard = defineScenario({
  attendance: {
    one: {
      data: {
        present: true,
        activity: {
          create: {
            name: 'String',
            date: '2022-08-08T15:05:16Z',
            group: { create: { name: 'String7322565', leader: 'String' } },
          },
        },

        member: {
          create: {
            name: 'String',
            birthDate: '2022-08-08T15:05:16Z',
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
            date: '2022-08-08T15:05:16Z',
            group: { create: { name: 'String2038173', leader: 'String' } },
          },
        },

        member: {
          create: {
            name: 'String',
            birthDate: '2022-08-08T15:05:16Z',
            phoneNumber: 'String',
            email: 'String',
            address: 'String',
          },
        },
      },
    },
  },
})
