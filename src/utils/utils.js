const formatDate = (string) => {
    const date = new Date(string);
    return date.toDateString();
}

export { formatDate }