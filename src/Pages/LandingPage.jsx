import React from 'react'

const LandingPage = () => {
    return (
        <div>
            <header className="header-dark border-b border-4 border-purple-500/30 header-blend sticky top-0 z-[100] text-white">
                <div className="notification-banner border-b border-purple-500/20 px-4 md:px-8 py-1 text-center">
                    <p
                        className="text-xs text-purple-200 notification-text"
                        id="notificationText"
                    >
                        🎉 Special Offer: Get 20% off on all robotics kits! Use code: ROBOT20
                    </p>
                </div>
            </header>
        </div>
    )
}

export default LandingPage
