import { Map, fromJS } from 'immutable'

it('Map merges with plain js object correctly', () => {
    const m1 = Map({
        key1: Map({
            key2: 'some value 2'
        })
    })
    const m2 = m1.merge({
        key3: {
            key4: 'some value 4'
        }
    })
    expect(m2).toEqual(Map({
        key1: Map({
            key2: 'some value 2'
        }),
        key3: Map({
            key4: 'some value 4'
        })
    }))
})