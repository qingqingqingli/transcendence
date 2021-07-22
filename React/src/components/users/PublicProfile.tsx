import React, {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom"
import './stylesheets/Profile.css'
import axios from "axios";
import {GameModel} from "../../models/Game.model";

const PublicProfile = (props: any) => {
    const [games, setGames] = useState([]);
    const [wins, setWins] = useState(0);
    const [loses, setLoses] = useState(0);
    const [rank, setRank] = useState('');
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
            const {data} = await axios.post('publicUserData', {id: props.location.state.usersData.id});
            setUser(data);
        }
        getUser();
    }, [props.location.state.usersData.id]);

    useEffect(() => {
        const getGameData = async () => {
            const {data} = await axios.get('/allGameData');
            setGames(data);
        }
        getGameData();
    }, []);

    useEffect(() => {
        const getGames = async () => {
            let winNB = 0;
            let lossNB = 0;
            let playedNB = 0;
            let rank = 'ROOKIE';

            games.map((game: GameModel) => {
                if (!game.active) {
                    if (game.playerOne === user.id || game.playerTwo === user.id)
                        playedNB++;
                    if (game.winner === user.id)
                        winNB++;
                    if (game.loser === user.id)
                        lossNB++;
                    if (winNB >= 5)
                        rank = 'CHALLENGER';
                    if (winNB >= 10)
                        rank = 'RISING STAR';
                    if (winNB >= 15)
                        rank = 'ENDBOSS';
                }
            })
            setGamesPlayed(playedNB);
            setWins(winNB);
            setLoses(lossNB);
            setRank(rank);
        }
        getGames();
    }, [user.id, games]);


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
                            <Link to={`/profile`} type="button" className="btn btn-success btn-sm">Return to own profile</Link>
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
                                <div className="col-md-5 value"><p>{rank}</p></div>
                                <div className="col-md-7 desc"><p>Rank</p></div>
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
                                    {games.filter((game: GameModel) => !game.active && (game.playerOne === user.id || game.playerTwo === user.id)).map((gameData: GameModel) =>
                                        <tr key={gameData.gameID}>
                                            <td>#{gameData.gameID}</td>
                                            <td>{gameData.playerOneUsername} - {gameData.playerOneScore}</td>
                                            <td> vs </td>
                                            <td>{gameData.playerTwoScore} - {gameData.playerTwoUsername}</td>
                                        </tr>
                                    )}
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

export default PublicProfile
