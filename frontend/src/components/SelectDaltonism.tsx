import type { daltonismOptions } from "@/app/horario/page";

const SelectDaltonism = ({
    setColorPalette,
}: {
    setColorPalette: (e: daltonismOptions) => void;
}) => {
    const handleChange = (e: { target: { value: string } }) => {
        setColorPalette(e.target.value as daltonismOptions);
    };

    return (
        <div className="p-2 bg-gray-700 text-white rounded-md flex items-center justify-between">
            <label htmlFor="colorblind-select" className="mr-1 text-sm">
                Daltonismo:
            </label>
            <select
                id="colorblind-select"
                onChange={handleChange}
                className="bg-gray-800 text-white text-sm p-1 rounded"
            >
                <option value="default">Ninguno</option>
                <option value="protanopia">Protanopia</option>
                <option value="deuteranopia">Deuteranopia</option>
                <option value="tritanopia">Tritanopia</option>
            </select>
        </div>
    );
};

export default SelectDaltonism;
