
import { useState, useEffect, useCallback } from 'react';
import { LineChart } from '@tremor/react';
import { useAuth } from "../../../AuthContext";

export function LineChartComponent() {
    const API_ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}`;
    const { token } = useAuth();

    const [activeUsers, setActiveUsers] = useState(() => new Array(12).fill(0));
    const [approvedDoctors, setApprovedDoctors] = useState(() => new Array(12).fill(0));

    const fetchData = useCallback(async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const getResponseData = async (url) => {
                const response = await fetch(url, { headers });
                const data = await response.json();
                return data;
            };

            const [activeUsersResponse, approvedDoctorsResponse] = await Promise.all([
                getResponseData(`${API_ENDPOINT}/user/getAllUsers?isActive=active`),
                getResponseData(`${API_ENDPOINT}/doctor/getAlldoctors?isApproved=approved`)
            ]);

            const activeUsersData = activeUsersResponse.users || [];
            const approvedDoctorsData = approvedDoctorsResponse.data || [];

            const FindData = (Data, updateData) => {
                updateData = new Array(12).fill(0);
                Data.forEach(user => {
                    const date = new Date(user.createdAt);
                    const month = date.getMonth();
                    if (!isNaN(month) && month >= 0 && month < 12) {
                        console.log(month)
                        updateData[month] += 1;
                    }
                });
                return updateData;
            }

            setActiveUsers(FindData(activeUsersData, activeUsers));

            setApprovedDoctors(FindData(approvedDoctorsData, approvedDoctors));

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [token, API_ENDPOINT]);

    useEffect(() => {
        fetchData();
    }, [token]);

    const chartdata = [
        { date: 'Jan 24', NewUsers: activeUsers[0], 'New Approved Doctors': approvedDoctors[0] },
        { date: 'Feb 24', NewUsers: activeUsers[1], 'New Approved Doctors': approvedDoctors[1] },
        { date: 'Mar 24', NewUsers: activeUsers[2], 'New Approved Doctors': approvedDoctors[2] },
        { date: 'Apr 24', NewUsers: activeUsers[3], 'New Approved Doctors': approvedDoctors[3] },
        { date: 'May 24', NewUsers: activeUsers[4], 'New Approved Doctors': approvedDoctors[4] },
        { date: 'Jun 24', NewUsers: activeUsers[5], 'New Approved Doctors': approvedDoctors[5] },
        { date: 'Jul 24', NewUsers: activeUsers[6], 'New Approved Doctors': approvedDoctors[6] },
        { date: 'Aug 24', NewUsers: activeUsers[7], 'New Approved Doctors': approvedDoctors[7] },
        { date: 'Sep 24', NewUsers: activeUsers[8], 'New Approved Doctors': approvedDoctors[8] },
        { date: 'Oct 24', NewUsers: activeUsers[9], 'New Approved Doctors': approvedDoctors[9] },
        { date: 'Nov 24', NewUsers: activeUsers[10], 'New Approved Doctors': approvedDoctors[10] },
        { date: 'Dec 24', NewUsers: activeUsers[11], 'New Approved Doctors': approvedDoctors[11] },
    ];

    const dataFormatter = (number) => `${Intl.NumberFormat('us').format(number).toString()}`;

    return (
        <LineChart
            className="h-80"
            data={chartdata}
            index="date"
            categories={['NewUsers', 'New Approved Doctors']}
            colors={['indigo', 'rose']}
            valueFormatter={dataFormatter}
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
        />
    );
}
