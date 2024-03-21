import React from 'react'

const ActivitySkeltonData = ['hi', 'hi', 'hi']


export default function LoadingSkelton() {
    return (
        <div className="itinary-loading">
            <div className="itinary-loading__content">
                <div className="itinary-loading__item">
                    <div className="itinary-loading__date">
                        <h4 className="itinary-loading__date-text skeleton-loading">
                            Today
                        </h4>
                    </div>
                    <ul className="itinary-loading__tl">
                        <li className="itinary-loading__tl-li">
                            <ul className="itinary-loading__tl-single">
                                {ActivitySkeltonData.map((activityElement, i) => (
                                    <SkeltonElement key={i} />
                                ))
                                }

                            </ul>

                        </li>
                    </ul>
                </div>
            </div>

        </div>

    );
};


const SkeltonElement = () => (
    <li className="itinary-loading__tl-single" style={{ flexDirection: 'row', width: '100%' }}>
        <div className="itinary-loading__tl-single-icon-box">
            <div className="itinary-loading__tl-single-icon skeleton-image"></div>
            <div className="itinary-loading__tl-single-icon-line"></div>
        </div>
        <div className="itinary-loading__tl-single-content">
            <div className="itinary-loading__tl-single-head">
                <div>
                    <h4 className="itinary-loading__tl-single-title skeleton-loading">
                        {/* <span className="skeleton-loading">Loading...</span> */}
                        &nbsp; sent a message
                    </h4>
                    <h6 className="itinary-loading__tl-single-date skeleton-loading">
                        Added Loading...
                    </h6>
                </div>
                <div className="itinary-loading__tl-single-head--icon">
                    <div className="skeleton-icon"></div>
                </div>
            </div>
            <div className="itinary-loading__tl-single-block skeleton-loading " style={{ height: '60px', width: '60%' }}>
                <p>Loading...</p>
            </div>
        </div>
    </li>
)