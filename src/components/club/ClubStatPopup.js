import { X, BarChart3, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClubStat } from "../../services/ClubService";
import LoadingComponent from "../other/LoadingComponent";

const ClubStatsPopup = ({ clubName, onClose, clubId }) => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getClubStat(clubId).then(res => {
            setIsLoading(false);
            if (res.success) {
                setStats(res.data);
            }
        });
    }, []);

    const handleNavigateEvents = () => {
        navigate(`/clubs/${clubId}/events`);
        onClose();
    };

    const handleNavigateMembers = () => {
        navigate(`/clubs/${clubId}/members`);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-fadeIn">

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-100">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="text-gray-700 w-6 h-6" />
                        <h2 className="text-lg font-semibold text-gray-800">
                            {clubName} – Statistics
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                {isLoading ? <LoadingComponent /> :
                    <div className="p-6 grid grid-cols-2 gap-6">
                        <div className="p-4 bg-gray-50 rounded-xl shadow-sm border text-center">
                            <p className="text-sm text-gray-500">Paid Events</p>
                            <p className="text-2xl font-semibold text-gray-800">
                                {stats.paidEvents}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl shadow-sm border text-center">
                            <p className="text-sm text-gray-500">Free Events</p>
                            <p className="text-2xl font-semibold text-gray-800">
                                {stats.nonPaidEvents}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl shadow-sm border text-center col-span-2">
                            <p className="text-sm text-gray-500">Total Revenue</p>
                            <p className="text-2xl font-semibold text-gray-800">
                                ${stats.totalRevenue.toLocaleString()}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl shadow-sm border text-center col-span-2">
                            <p className="text-sm text-gray-500">Total Income</p>
                            <p className="text-2xl font-semibold text-gray-800">
                                ${stats.totalIncome.toLocaleString()}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl shadow-sm border text-center col-span-2">
                            <p className="text-sm text-gray-500 flex justify-center items-center gap-1">
                                <Users className="w-4 h-4 text-gray-500" /> Members
                            </p>
                            <p className="text-2xl font-semibold text-gray-800">
                                {stats.totalMembers}
                            </p>
                        </div>
                    </div>
                }

                {/* Footer */}
                <div className="px-6 py-4 border-t flex justify-end gap-3 bg-gray-50">
                    <button
                        onClick={handleNavigateMembers}
                        className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
                    >
                        View Members
                    </button>
                    <button
                        onClick={handleNavigateEvents}
                        className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow"
                    >
                        View Events
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClubStatsPopup;