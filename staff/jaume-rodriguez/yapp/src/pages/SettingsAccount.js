import { useState, useEffect } from 'react'
import Header from '../components/Header'
import retrieveUser from '../logic/retrieveUser';
import updateUserName from '../logic/updateUserName';
import updateUserEmail from '../logic/updateUserEmail';
import updateUserPassword from '../logic/updateUserPassword';

function SettingsAccount(props) {

    const [user, setUser] = useState()
    const [buttonFormName, setButtonFormName] = useState('open')
    const [buttonFormEmail, setButtonFormEmail] = useState('open')
    const [buttonFormPassword, setButtonFormPassword] = useState('open')
    const [inputNameDisabled, setInputNameDisabled] = useState(true)
    const [inputEmailDisabled, setInputEmailDisabled] = useState(true)
    const [inputPasswordDisabled, setInputPasswordDisabled] = useState(true)
    const [inputPasswordText, setInputPasswordText] = useState(true)

    useEffect(() => {
        try {
            retrieveUser(window.userId, (error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }
                setUser(user)
            })
        } catch (error) {
        }
    }, [])

    // HEADER LINKS BRIDGE
    const handleHomeLink = () => {
        props.onHomeLink();
    };

    // TOGGLE MENU LINKS BRIDGE
    const handleSettingsLink = () => {
        props.onSettingsAccountLink();
    };

    const handleLogoutLink = () => {
        window.userId = null;
        props.onLoggedoutLink();
    };

    // FORM BUTTONS VISUAL
    const handleButtonFormName = () => {
        setButtonFormName(buttonFormName === "open" ? "close" : "open");
    }
    const handleButtonFormEmail = () => {
        setButtonFormEmail(buttonFormEmail === "open" ? "close" : "open");
    }
    const handleButtonFormPassword = () => {
        setButtonFormPassword(buttonFormPassword === "open" ? "close" : "open");
    }

    // FORM INPUTS VISUAL
    const handleInputNameDisabled = () => {
        setInputNameDisabled(!inputNameDisabled);
    }
    const handleInputEmailDisabled = () => {
        setInputEmailDisabled(!inputEmailDisabled);
    }
    const handleInputPasswordDisabled = () => {
        setInputPasswordDisabled(!inputPasswordDisabled);
    }
    const handleInputPasswordText = () => {
        setInputPasswordText(!inputPasswordText);
    }

    // FORM SUBMITS
    const handleUserNameSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const nameInput = form.name;
        const newName = nameInput.value

        try {
            updateUserName(newName, window.userId, (error) => {
                if (error) {
                    alert(error.message)
                    return
                }
                alert('The user name has been changed successfully')
            })
            user.name = newName
            // FORM BUTTON VISUAL
            handleButtonFormName()

        } catch (error) {
            alert(error.message)
        }
    };

    const handleUserEmailSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const emailInput = form.email;
        const newEmail = emailInput.value

        try {
            updateUserEmail(newEmail, window.userId, (error) => {
                if (error) {
                    alert(error.message)
                    return
                }
                alert('The user email has been changed successfully')
            })
            user.email = newEmail
            // FORM BUTTON VISUAL
            handleButtonFormEmail()

        } catch (error) {
            alert(error.message)
        }
    };

    const handleUserPasswordSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const passwordInput = form.password;
        const newPassword = passwordInput.value

        try {
            updateUserPassword(newPassword, window.userId, (error) => {
                if (error) {
                    alert(error.message)
                    return
                }
                alert('The user password has been changed successfully')
            })
            user.password = newPassword
            passwordInput.value = ''
            // FORM BUTTON VISUAL
            handleButtonFormPassword()

        } catch (error) {
            alert(error.message)
        }
    };

    return (
        <main className="min-h-screen bg-sky-500">
            {/* HEADER */}
            <Header
                onHomeLink={handleHomeLink}
                onSettingsAccountLink={handleSettingsLink}
                onLoggedoutLink={handleLogoutLink}
            />
            {/* SETTINGS ACCOUNT PANEL*/}
            <section className="flex z-1 w-full justify-center flex-wrap">
                <div className="flex flex-row justify-center content-center z-0 p-8 bg-sky-500 border-black border-b border-solid w-full h-16">
                    <span className="self-center font-semibold text-4xl text-sky-100">
                        My Account
                    </span>
                </div>
                {/*SETTINGS ACCOUNT*/}
                <div className="flex content-start flex-col w-92 gap-1 p-10 border-solid border-b-4 border-x border-sky-800 bg-inherit bg-sky-100">
                    <span className="mb-6 -mt-2 text-xl font-semibold text-sky-800 text-center">Manage your Trello account</span>
                    <hr className="w-full mx-auto my-2 border-black -mt-2 mb-4" />
                    <form className="flex w-full flex-col justify-center" onSubmit={handleUserNameSubmit}>
                        <label htmlFor="updateName" className='font-semibold text-sky-900 mb-2'>Name</label>
                        <div className='flex flex-row'>
                            <input
                                name='name'
                                type="text"
                                placeholder="Enter new name"
                                id="updateName"
                                title="Please enter at least 1 character"
                                disabled={(inputNameDisabled) ? "disabled" : ""}
                                className="h-10 rounded placeholder:text-slate-800 text-base pl-2 w-64 disabled:bg-sky-200"
                                key={user}
                                defaultValue={user ? user.name : 'Name'}
                            />
                            {buttonFormName === "open" && (
                                <span
                                    className="self-start scale-125 p-1 bg-sky-100 rounded text-black mx-2 mt-1 cursor-pointer material-symbols-outlined cursor-pointer"
                                    onClick={() => {
                                        handleInputNameDisabled();
                                        handleButtonFormName();
                                    }}>edit</span>
                            )}
                            {buttonFormName === "close" && (
                                <button
                                    className="self-start scale-125 p-1 bg-sky-100 rounded text-black mx-2 mt-1 cursor-pointer material-symbols-outlined"
                                    onClick={handleInputNameDisabled}>save</button>
                            )}
                        </div>
                        <hr className="w-full mx-auto my-1 border-sky-400" />
                    </form>
                    <form className="flex w-full justify-center flex-col" onSubmit={handleUserEmailSubmit}>
                        <label htmlFor="updateEmail" className='font-semibold text-sky-900 mb-2'>Email</label>
                        <div className='flex flex-row'>
                            <input
                                name='email'
                                type="text"
                                placeholder="Enter new email"
                                id="updateEmail"
                                title="Please use @ and . on your email"
                                disabled={(inputEmailDisabled) ? "disabled" : ""}
                                className="h-10 rounded placeholder:text-slate-800 text-base pl-2 w-64 disabled:bg-sky-200"
                                key={user}
                                defaultValue={user ? user.email : 'Email'}
                            />
                            {buttonFormEmail === "open" && (
                                <span
                                    className="self-start scale-125 p-1 bg-sky-100 rounded text-black mx-2 mt-1 cursor-pointer material-symbols-outlined cursor-pointer"
                                    onClick={() => {
                                        handleInputEmailDisabled();
                                        handleButtonFormEmail();
                                    }}>edit</span>
                            )}
                            {buttonFormEmail === "close" && (
                                <button
                                    className="self-start scale-125 p-1 bg-sky-100 rounded text-black mx-2 mt-1 cursor-pointer material-symbols-outlined"
                                    onClick={handleInputEmailDisabled}>save</button>
                            )}
                        </div>
                    </form>
                    <hr className="w-full mx-auto my-1 border-sky-400" />
                    <form className="flex w-full justify-center flex-col" onSubmit={handleUserPasswordSubmit}>
                        <label htmlFor="updatePassword" className='font-semibold text-sky-900 mb-2'>Password</label>
                        <div className='flex flex-row'>
                            <input
                                name='password'
                                type={inputPasswordText ? 'password' : 'text'}
                                placeholder="Enter new password"
                                id="updatePassword"
                                title="Please enter at least 8 characters without spaces"
                                disabled={(inputPasswordDisabled) ? "disabled" : ""}
                                className="h-10 rounded placeholder:text-slate-800 text-base pl-2 w-64 disabled:bg-sky-200"
                            />
                            {buttonFormPassword === "open" && (
                                <span
                                    className="self-start scale-125 p-1 bg-sky-100 rounded text-black mx-2 mt-1 cursor-pointer material-symbols-outlined cursor-pointer"
                                    onClick={() => {
                                        handleInputPasswordDisabled();
                                        handleButtonFormPassword();
                                    }}>edit</span>
                            )}
                            {buttonFormPassword === "close" && (
                                <button
                                    className="self-start scale-125 p-1 bg-sky-100 rounded text-black mx-2 mt-1 cursor-pointer material-symbols-outlined"
                                    onClick={handleInputPasswordDisabled}>save</button>
                            )}
                        </div>
                    </form>
                    <div className='-my-1'>
                        <hr className="w-full mx-auto my-1 border-sky-400" />
                        <span className="flex">
                            <input
                                type="checkbox"
                                onChange={handleInputPasswordText} />
                            <label className="text-xs mx-2 my-3 text-sky-900 font-semibold">Show password</label>
                        </span>
                    </div>
                </div>
            </section >
        </main >
    );
}

export default SettingsAccount