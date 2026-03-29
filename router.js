/**
 * SPA Router using History API
 * Manages navigation between mitosis, meiosis, and comparison views
 */

export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.onRouteChange = null;

    window.addEventListener('popstate', (e) => {
      const route = e.state?.route || 'home';
      this.currentRoute = route;
      if (this.onRouteChange) this.onRouteChange(route);
    });
  }

  /**
   * Registers a route
   * @param {string} path
   * @param {function} handler
   */
  register(path, handler) {
    this.routes[path] = handler;
  }

  /**
   * Navigates to a route
   * @param {string} path
   * @param {object} state
   */
  navigate(path, state = {}) {
    if (this.currentRoute === path) return;

    this.currentRoute = path;
    window.history.pushState({ route: path, ...state }, '', `#${path}`);

    if (this.onRouteChange) {
      this.onRouteChange(path, state);
    }
  }

  /**
   * Gets the current route from URL hash
   * @returns {string}
   */
  getCurrentRoute() {
    const hash = window.location.hash.slice(1);
    return hash || 'home';
  }

  /**
   * Initializes the router
   */
  init() {
    const route = this.getCurrentRoute();
    this.currentRoute = route;
    if (this.onRouteChange) {
      this.onRouteChange(route);
    }
  }
}
