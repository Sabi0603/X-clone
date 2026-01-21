export const formatPostDate = (createdAt) => {
	const currentDate = new Date();
	const createdAtDate = new Date(createdAt);

	const diffInSeconds = Math.floor((currentDate - createdAtDate) / 1000);
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	const diffInHours = Math.floor(diffInMinutes / 60);
	const diffInDays = Math.floor(diffInHours / 24);

	if (diffInDays > 1) {
		return createdAtDate.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	} else if (diffInDays === 1) {
		return "1d";
	} else if (diffInHours >= 1) {
		return `${diffInHours}h`;
	} else if (diffInMinutes >= 1) {
		return `${diffInMinutes}m`;
	} else {
		return "Just now";
	}
};

export const formatPostDateLive = (createdAt) => {
	const now = new Date();
	const created = new Date(createdAt);

	const sec = Math.floor((now - created) / 1000);
	const min = Math.floor(sec / 60);
	const hr = Math.floor(min / 60);
	const day = Math.floor(hr / 24);
	const year = Math.floor(day / 365);

	if (year >= 1) return `${year}y ago`;
	if (day >= 1) return `${day}d ago`;
	if (hr >= 1) return `${hr}h ago`;
	if (min >= 1) return `${min}m ago`;
	if (sec < 5) return "Just now";
	return `${sec}s ago`;
};


export const formatMemberSinceDate = (createdAt) => {
	const date = new Date(createdAt);
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return `Joined ${months[date.getMonth()]} ${date.getFullYear()}`;
};
