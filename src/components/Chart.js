import React, { useMemo } from 'react'
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart({ consumeList, setConsumeList, modifying }) {

    const totalCost = useMemo(() => costSummary(consumeList), [ consumeList ]);
    const costDataArr = useMemo(() => costPersentMap(consumeList, totalCost), [ consumeList, totalCost ]);
    const costTitleArr = useMemo(() => consumeList.map((listObj) => listObj.title), [ consumeList ]);

    const handleResetBtnClick = (e) => {
        e.preventDefault();
        if (modifying) return alert('리스트 수정 상태에서는 [초기화]를 진행할 수 없습니다');
        const confirmTxt = '초기화할 시 모든 지출 내역이 삭제되며, \n다시는 돌이킬 수 없습니다. \n초기화하시겠습니까?'
        if (window.confirm(confirmTxt)) setConsumeList([]);
    }

    const chartData = {
        labels: costTitleArr,
        datasets: [
            {
                label: 'persent(%)',
                data: costDataArr,
                // backgroundColor: '#D8DFE3',
                backgroundColor: ['#17C1B1', '#1792EE', '#596DEA', '#9774EE', '#E679BF'],
                hoverOffset: 6,
                // hoverBackgroundColor: '#76B0F3',
                hoverBorderWidth: 0,
            },
        ],
    };

    const chartPlugins = {
        plugins: {
            legend: { 
                labels: { 
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                    // pointStyleWidth: 16,
                    // useBorderRadius: true,
                    // borderRadius: 20,
                    padding: 12,
                },
                display: true,
                position: 'bottom',
            },
            tooltip: {
                backgroundColor: 'rgba(50, 53, 57, 0.9)'
            }
        }
    };

    return (
        <section>
            <SummaryContainer>
                <div className='flex justify-between items-center mb-1'>
                    <SummaryTitle>총 지출</SummaryTitle>
                    <ResetBtn onClick={handleResetBtnClick}>
                        <span className='material-icons'>restart_alt</span>
                        초기화
                    </ResetBtn>
                </div>
                <SummaryTotal>{ formatter(totalCost) }원</SummaryTotal>
            </SummaryContainer>
            <ChartContainer>
                <Doughnut fallbackContent={<ChartSkeleton />} data={chartData} options={chartPlugins} />
            </ChartContainer>
        </section>
    )
}

// chart logic
function costSummary(listArr) {
    return listArr
        .map((listObj) => +listObj.cost)
        .reduce((a, b) => a + b);
}

function costPersentMap(listArr, total) {
    return listArr
        .map((listObj) => +listObj.cost)
        .map((cost) => +(cost / total * 100).toFixed(1));
}

// formatter
function formatter(numberCost) {
    return numberCost.toLocaleString('ko-KR');
}


// styled components
const SummaryContainer = styled.div`
    display: block;
    width: 100%;
    height: auto;
    padding: 12px 12px 14px;
    margin: 0px 0px 20px;
    border-radius: 6px;
    background-color: var(--ui-information);
`;

const SummaryTitle = styled.h2`
    display: block;
    width: auto;
    height: auto;
    font-size: 15px;
    font-weight: 500;
    color: var(--brand-white);
    white-space: nowrap;
`;

const SummaryTotal = styled.p`
    display: block;
    width: 100%;
    height: auto;
    font-size: 18px;
    font-weight: 600;
    color: var(--brand-white);
    white-space: nowrap;
`;

const ResetBtn = styled.button`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 4px 12px 4px 8px;
    font-size: 12px;
    font-weight: 500;
    color: var(--brand-white);
    border-radius: 16px;
    background-color: rgba(0, 20, 40, 0.2);

    & > .material-icons {
        margin-right: 2px;
        font-size: 16px;
        color: var(--brand-white);
    }
`;

const ChartSkeleton = styled.div`
    display: block;
    width: 100%;
    height: 320px;
    border-radius: 2px;
    background-color: var(--grayscale-100);
`;

const ChartContainer = styled.div`
    display: block;
    width: 100%;
    padding: 24px;
    border-radius: 6px;
    border: 1px solid var(--grayscale-100);
`;