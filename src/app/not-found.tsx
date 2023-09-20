import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <main className="center">
            <img
                className="img-fluid"
                src="images/notfound.png"
                alt="not-found"
                width="250"
            />
            {/* <h6>404: Page Not Found!</h6> */}
            <h6>
                The page you are looking for cannot be found or you do not have
                access to this page
            </h6>
            <Link className="btn btn-danger" href="..">
                Go Back
            </Link>
        </main>
    );
}
