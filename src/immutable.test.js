import { Map, fromJS } from 'immutable'

it('Map merges with plain js object correctly', () => {
    const m1 = Map({
        key1: Map({
            key2: 'some value 2'
        })
    })
    const m2 = m1.merge({
        key3: {
            key4: 'some value 4',
            key5: {
                key6: 'some value 6'
            }
        }
    })
    expect(m2).toEqual(Map({
        key1: Map({
            key2: 'some value 2'
        }),
        key3: Map({
            key4: 'some value 4',
            key5: Map({
                key6: 'some value 6'
            })
        })
    }))
})

it('Map setIn with plain js object correctly', () => {
    const m1 = fromJS({
        k1: {
            k2: {
                k3: 'value 3'
            }
        }
    })
    const m2 = m1.setIn(['k1', 'k2'], fromJS({
        k99: 'value 99'
    }))
    expect(m2).toEqual(Map({
        k1: Map({
            k2: Map({
                k99: 'value 99'
            })
        })
    }))
})