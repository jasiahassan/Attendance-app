import { RxCross2 } from "react-icons/rx";
import { ShimmerContentBlock } from "react-shimmer-effects";
export default function ProfileModal({ user, setShowProfile, isloading }) {
  const handleCancel = () => setShowProfile(false);
  return (
    <>
      <div
        className="fixed  flex items-center justify-center top-0 left-0 bg-black/70 w-full h-full "
        onClick={handleCancel}
      ></div>
      <div className="absolute  w-[55%] px-8 py-12 bg-white border rounded-xl h-auto flex flex-col justify-center items-center gap-y-8 top-[20%] left-[23%]">
        <RxCross2
          className="absolute top-[4%] left-[95%] text-3xl text-gray-600 cursor-pointer"
          onClick={handleCancel}
        />
        {isloading ? (
          <>
            <ShimmerContentBlock
              title
              text
              cta
              thumbnailWidth={370}
              thumbnailHeight={370}
            />
          </>
        ) : (
          user.map((item) => {
            return (
              <div key={item._id} className="text-center flex gap-x-12">
                <div>
                  <img
                    src={item.image}
                    alt=""
                    className="w-[18rem] object-cover mb-4"
                  />

                  <h1 className="text-3xl font-semibold text-gray-500 ">
                    {item.firstName.toUpperCase()}
                  </h1>
                  <p>(Intern at Raybbit Technologies)</p>
                </div>
                <div className="text-left py-8">
                  <h4 className="font-medium mb-6 text-xl text-gray-500">
                    FULL NAME:{" "}
                    <span className="text-purple-500">
                      {item.firstName} {item.lastName}
                    </span>
                  </h4>
                  <h4 className="font-medium mb-6 text-xl text-gray-500">
                    CONTACT NUMBER:{" "}
                    <span className="text-purple-500">{item.phoneNumber}</span>
                  </h4>
                  <h4 className="font-medium mb-6 text-xl text-gray-500">
                    EMAIL ADDRESS:{" "}
                    <span className="text-purple-500">{item.userId.email}</span>
                  </h4>

                  <h4 className="font-medium text-xl mb-6 text-gray-500">
                    ADDRESS:{" "}
                    <span className="text-purple-500">{item.address}</span>
                  </h4>
                  <h4 className="font-medium text-xl mb-6 text-gray-500">
                    ROLE:{" "}
                    <span className="text-purple-500">
                      {item.userId.roleId.role}
                    </span>
                  </h4>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
