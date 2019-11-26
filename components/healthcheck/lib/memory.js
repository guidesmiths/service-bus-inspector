/* eslint-disable guard-for-in */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-restricted-syntax */
const byteToMegabyte = memoryAmmount => Math.round(memoryAmmount / 1024 / 1024 * 100) / 100;

const getCurrentMemory = () => {
	const memory = {};
	for (const key in process.memoryUsage()) {
		memory[key] = byteToMegabyte(process.memoryUsage()[key]);
	}
	return memory;
};

module.exports = () => getCurrentMemory();
