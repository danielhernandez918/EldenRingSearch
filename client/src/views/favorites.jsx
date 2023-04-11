import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles.css';


const Favorites = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/loggedUser`, { withCredentials: true })
            .then(res => {
            setUserData(res.data);
            })
            .catch(err => {
            console.log(err);
            });
    }, []);

    const handleDelete = (item) => {
        // console.log(item);
        axios({
          method: 'delete',
          url: 'http://localhost:8000/api/users/favorites',
          withCredentials: true,
          data: {
            itemId: item // pass the ID of the item to remove in the request body
          }
        })
          .then(res => {
            setUserData(res.data); // update the user data in state with the updated user object returned from the server
          })
          .catch(err => {
            console.log(err);
          });
      };

    return (
        <div className='list'>
            <h2> Favorites</h2>
            <div className='FavoriteContainer'>
                {
                    userData &&
                    userData.favorites.map((item, i) => (
                        <div className='Items' key={i}>
                            <h2>
                                <>{item}</>
                                <button type="button" className="deleteButton" onClick={() => handleDelete(item)}>Delete</button>
                            </h2>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Favorites