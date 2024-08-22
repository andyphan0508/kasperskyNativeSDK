using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Root.Checker.RNRootChecker
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNRootCheckerModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNRootCheckerModule"/>.
        /// </summary>
        internal RNRootCheckerModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNRootChecker";
            }
        }
    }
}
