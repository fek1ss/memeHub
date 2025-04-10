// src/pages/Dashboard/Dashboard.jsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MemeList from '../../components/MemeList/MemeList';
import MemeForm from '../../features/memes/MemeForm';
import { fetchMemes } from '../../features/memes/memeAPI';

const Dashboard = () => {
    const user = useSelector(state => state.auth.user);
    const [memes, setMemes] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const loadMemes = async () => {
            const res = await fetchMemes();
            setMemes(res);
        };
        loadMemes();
    }, [refresh]);

    const triggerRefresh = () => setRefresh(prev => prev + 1);

    return (
        <div>
            <h1>Dashboard</h1>

            {user && user.role === 'admin' ? (
                <>
                    <Link to="/add-order">
                        <button>Place an Order</button>
                    </Link>
                    <MemeForm onMemeCreated={triggerRefresh} /> {/* Форма для добавления мемов */}
                </>
            ) : (
                <p>Welcome to Dashboard</p>
            )}

            {/* Отображение мемов */}
            <MemeList cards={memes} refreshTrigger={refresh} />
        </div>
    );
};

export default Dashboard;
