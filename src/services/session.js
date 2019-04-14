export default () => {}

export async function setSessionOnStorage(token) {
    try {
        const sessionInfo = { token, date: new Date() }
        await localStorage.setItem('sessionInfo', JSON.stringify(sessionInfo));
        return true;
    } catch (error) {
        return false
    }

}
export async function getSessionFromStorage() {
    try {
        const sessionInfo = await JSON.parse(localStorage.getItem('sessionInfo'));
        return sessionInfo;
    } catch (error) {
        return false
    }

}

export async function delSessionFromStorage() {
    try {
        await localStorage.removeItem('sessionInfo');
        return true;
    } catch (error) {
        return false
    }

}