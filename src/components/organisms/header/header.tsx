import { Logo } from '@/components/atoms';
import { CurrentLimiteUploadSizeStore } from '@/store/current-limit-upload-size';
import { formatFileSize, MAX_UPLOAD_LIMIT_FREE_ACCOUNT } from '@/utils/files';

import { IoIosLogOut } from 'react-icons/io';

interface IHeaderProps {
	email?: string;
	logOut: () => void;
}

const Header = ({ email, logOut }: IHeaderProps) => {
	const { currentLimiteUploadSize } = CurrentLimiteUploadSizeStore();

	return (
		<div className=" bg-white p-4 rounded-b-3xl">
			<Logo type="secondary" />

			<div className="flex items-center justify-between">
				<div>
					<p className="text-xs text-gray-600">{email || ''}</p>
				</div>

				<div className="flex items-center gap-5">
					<div>
						<progress
							className="progress progress-primary w-56"
							value={currentLimiteUploadSize}
							max={MAX_UPLOAD_LIMIT_FREE_ACCOUNT}
						></progress>
						<p className="text-gray-600 text-xs">
							{formatFileSize(currentLimiteUploadSize)} de{' '}
							{formatFileSize(MAX_UPLOAD_LIMIT_FREE_ACCOUNT)}
						</p>
					</div>
					<div className="tooltip max-w-40" data-tip="Sair">
						<div
							onClick={logOut}
							className="w-11 h-11 bg-white cursor-pointer flex justify-center items-center rounded-full hover:bg-primary text-primary hover:text-white transition-all"
						>
							<IoIosLogOut className="text-2xl" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
