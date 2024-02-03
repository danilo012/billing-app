import axios from 'axios'
export const setUser = (data) => {
    return {
        type: 'SET_USER',
        payload: data
    }
}

export const asyncGetUser = () => {
    return (dispatch) => {
        const url = 'http://dct-pos-app.herokuapp.com/api/users/account'
        const token = localStorage.getItem('token')
        axios.get(url, {
            headers:{
                Authorization : `Bearer ${token}`
            }
        })
            .then(response => {
                const data = response.data
                dispatch(setUser(data))
            })
            .catch(err => alert(err.message))
    }
}
