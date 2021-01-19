const star_systems_Schema = new mongoose.Schema({
    timestamp: String,
    name: String,
    factions: [{
        name: String,
        factionState: {
            state: String,
            trend: String
        },
        goverment: String,
        influence: Number,
        allegiance: String,
        activeStates: [{
            state: String,
            trend: String
        }],
    }],
    systemFaction: {
        name: String,
        state: [{
            state: String,
            trend: String
        }],
    },
    conflicts: [{
        warType: String,
        status: String,
        factions: [{
            name: String,
            stake: String,
            daysWon: Number
        }]
    }]
});


const starSystemTest = {
    timestamp: "2021-01-15T14:47:53Z",
    name: "Meliae",
    factions: [
        {
            name: "New Pilots Initiative",
            factionState: {
                state: "Boom",
                trend: null
            },
            goverment: "Corporate",
            influence: 0.663356,
            allegiance: "Independent",
            activeStates: [{
                state: "Boom",
                trend: null
            }]
        },
        {
            name: "Union of Meliae Progressive Party",
            factionState: [{
                state: "None",
                trend: null
            }],
            goverment: "Democracy",
            influence: 0.083416,
            allegiance: "Federation",
            activeStates: []
        }
    ],
    systemFaction: {
        name: "New Pilots Initiative",
        state: [{
            state: "Boom",
            trend: null
        }],
    },
    conflicts: [
        {
            warType: "election",
            status: "pending",
            factions: [
                {
                    name: "i Bootis Democrats",
                    stake: "Bailey Observatory",
                    daysWon: 0
                },
                {
                    name: "Union of Meliae Progressive Party",
                    stake: "Euclid Enterprise",
                    daysWon: 0
                }
            ]
        }
    ]
};




const starSystemTest2 = {
    timestamp: "2021-01-15T15:32:29Z",
    name: "Dahan",
    factions: [
        {
            name: "New Pilots Initiative",
            factionState: {
                state: "Investment",
                trend: null
            },
            goverment: "Corporate",
            influence: 0.495504,
            allegiance: "Independent",
            activeStates: [
                {
                    state: "Investment",
                    trend: null
                },
                {
                    state: "CivilLiberty",
                    trend: null
                }
            ]
        },
        {
            name: "i Bootis Democrats",
            factionState: {
                state: "None",
                trend: null
            },
            goverment: "Democracy",
            influence: 0.110889,
            allegiance: "Federation",
            activeStates: [],
        },
    ],
    systemFaction: {
        name: "New Pilots Initiative",
        state: {
            state: "Investment",
            trend: null
        }
    },
    conflicts: []
};








