const includesPath = (routes: string[], currPath: string) => {
    return routes.some(route => currPath.includes(route));
};

export default includesPath;
