import React, {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom"
import './stylesheets/Profile.css'
import axios from "axios";
import {GameModel} from "../../Models/Game.model";

const Profile = () => {
    const [games, setGames] = useState([]);
    const [wins, setWins] = useState(0);
    const [loses, setLoses] = useState(0);
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [unauthorized, setUnauthorized] = useState(false);
    const [user, setUser] = useState({
        username: '',
        avatar: '',
        id: 0,
    });

    useEffect(() => {
        let mounted = true;

        const authorization = async () => {
            try { await axios.get('userData'); }
            catch(err){
                if(mounted)
                    setUnauthorized(true);
            }
        }
        authorization();
        return () => {mounted = false;}
    }, []);

    useEffect(() => {
       const getUser = async () => {
           const {data} = await axios.get('userData')
           setUser(data);
       }
        getUser();
    }, []);

    useEffect(() => {
        const getGames = async () => {
            let winNB = 0;
            let lossNB = 0;
            let playedNB = 0;
            const {data} = await axios.get('/allGameData');
            setGames(data);
            {games.map((game: GameModel) => {
                if (!game.active) {
                    console.log('iteration');
                    if (game.playerOne === user.id || game.playerTwo === user.id)
                        playedNB++;
                    if (game.winner === user.id)
                        winNB++;
                    if (game.loser === user.id)
                        lossNB++;
                }
                setGamesPlayed(playedNB);
                setWins(winNB);
                setLoses(lossNB);
            })}
        }
        getGames();
    }, [user.id]);

    const logout = async () => {
        await axios.post('logout', {});
    }

    if (unauthorized)
        return <Redirect to={'/'}/>;

    return (
        <div className="container profilepage">
            <div className="row profile">
                <div className="col-md-12">
                    <div className="profile-sidebar">
                        <div className="profile-userpic">
                            <img src={`${user?.avatar}`} className="img-responsive" alt=""/>
                        </div>

                        <div className="profile-usertitle">
                            <div className="profile-usertitle-job">{user?.username}</div>
                        </div>

                        <div className="profile-userbuttons">
                            <Link to={`/PlayGame`} type="button" className="btn btn-success btn-sm">Play game</Link>
                            <Link to={`/WatchGame`} type="button" className="btn btn-success btn-sm">Watch game</Link>
                            <Link to={`/chat`} type="button" className="btn btn-success btn-sm">Chat</Link>
                            <Link to={`/update`} type="button" className="btn btn-success btn-sm">Update profile</Link>
                            <Link to="/" onClick={logout} type="button" className="btn btn-danger btn-sm">Log out</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="row profile-content">
                        <div className="col-md-4 box-info">
                            <div className="row">
                                <div className="col-md-12 title"><h3>PLAYER STATISTICS</h3></div>
                            </div>
                            <div className="row stat">
                                <div className="col-md-2 value"><p>---</p></div>
                                <div className="col-md-10 desc"><p>Rank</p></div>
                            </div>
                            <div className="row stat">
                                <div className="col-md-2 value"><p>{wins}</p></div>
                                <div className="col-md-10 desc"><p>Wins</p></div>
                            </div>
                            <div className="row stat">
                                <div className="col-md-2 value"><p>{loses}</p></div>
                                <div className="col-md-10 desc"><p>Loses</p></div>
                            </div>
                            <div className="row stat">
                                <div className="col-md-2 value"><p>{gamesPlayed}</p></div>
                                <div className="col-md-10 desc"><p>Games played</p></div>
                            </div>
                        </div>
                        {/*<div className="col-md-"></div>*/}
                        <div className="col-md-1"></div>
                        <div className="col-md-7 ">
                            <div className="row">
                                <div className="col-md-12 title"><h3>MATCH HISTORY</h3></div>
                            </div>
                            <div className="row ranking">

                                <table>
                                    <thead>
                                        <tr>
                                            <th>GAME ID</th>
                                            <th>Player</th>
                                            <th> - </th>
                                            <th>player</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {games.map((game: GameModel) => {
                                            if (!game.active && (game.playerOne === user.id || game.playerTwo === user.id)) {
                                                return (
                                                    <tr key={game.gameID}>
                                                        <td>#{game.gameID}</td>
                                                        <td>{game.playerOneUsername} - {game.playerOneScore}</td>
                                                        <td> vs </td>
                                                        <td>{game.playerTwoScore} - {game.playerTwoUsername}</td>
                                                    </tr>
                                                )
                                            }
                                        })}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Profile
